// input.js

var Input = /** @class */ (function () {
  function Input() {}

  Input.prototype.select = function (el, options) {
    // В исходнике тут был ранний return; — из-за него select не работал.
    // Убрал, чтобы селекты с [data-option] работали как задумано.
    options.forEach(function (option) {
      option.addEventListener('click', function () {
        var value = option.dataset.option; // если нужно, значение есть тут
        var text = option.textContent || '';
        el.value = text;
        el.dispatchEvent(new Event('input'));
      });
    });
    el.addEventListener('input', function () {
      // debug
      // console.log(el.value);
    });
  };

  Input.prototype.phone = function (el) {
    // Запрещаем ввод '+' не в начале
    el.addEventListener('keydown', function (e) {
      if (e.key === '+') {
        // разрешаем только если курсор в нуле и нет уже плюса
        var atStart = el.selectionStart === 0 && el.selectionEnd === 0;
        var alreadyHasPlus = el.value.startsWith('+');
        if (!atStart || alreadyHasPlus) {
          e.preventDefault();
        }
      }
    });

    // Маска: только цифры по матрице, плюс — опционально в начале
    el.addEventListener('input', function (event) {
      mask(event, el, '________________'); // матрица без '+'
    });

    // На blur подчистим одиночный '+'
    el.addEventListener('blur', function (event) {
      mask(event, el, '________________');
    });
  };

  Input.prototype.number = function (el, button) {
    var minString = el.getAttribute('min');
    var min = minString ? +minString : 1;

    var maxString = el.getAttribute('max');
    var max = maxString ? +maxString : 9999999;

    var stepString = el.getAttribute('step');
    var step = stepString ? +stepString : 1;

    var valueString = el.getAttribute('value');
    var value = valueString ? +valueString : 1;

    button.subtract.addEventListener('click', function () {
      var calc = value - step;
      value = calc <= min ? min : calc;
      el.value = String(value);
      el.dispatchEvent(new Event('input'));
    });

    button.add.addEventListener('click', function () {
      var calc = value + step;
      value = calc >= max ? max : calc;
      el.value = String(value);
      el.dispatchEvent(new Event('input'));
    });

    el.addEventListener('input', function () {
      var elValue = +el.value;
      if (elValue < min) {
        elValue = min;
      }
      if (elValue > max) {
        elValue = max;
      }
      value = elValue;
      el.value = String(value);
    });
  };

  Input.prototype.mask = function (el) {
    el.addEventListener('input', function (event) {
      mask(event, el, el.getAttribute('mask'));
    });
    el.addEventListener('blur', function (event) {
      mask(event, el, el.getAttribute('mask'));
    });
  };

  Input.prototype.listenner = function (inputs) {
    var _this = this;
    inputs.forEach(function (input) {
      var parent = input.parentElement || document;
      var options = Array.from(parent.querySelectorAll('[data-option]'));
      if (options.length) {
        _this.select(input, options);
        return;
      }

      var type = input.getAttribute('type');
      if (type === 'tel') {
        _this.phone(input);
      }

      var counterButtonSubtract = parent.querySelector('[button-subtract]');
      var counterButtonAdd = parent.querySelector('[button-add]');
      if (type === 'number' && counterButtonSubtract && counterButtonAdd) {
        _this.number(input, { subtract: counterButtonSubtract, add: counterButtonAdd });
      }

      var maskAttr = input.getAttribute('mask');
      if (maskAttr) {
        _this.mask(input);
      }
    });
  };

  return Input;
}());

/**
 * Универсальная маска
 * - matrix по умолчанию без плюса
 * - допускает опциональный '+' ТОЛЬКО в начале
 * - остальные символы очищаются, оставляем только цифры в соответствии с матрицей
 */
function mask(event, el, matrix) {
  if (matrix === void 0 || !matrix) { matrix = '________________'; } // без плюса
  if (!event.isTrusted) return;

  // Сырое значение и флаг наличия '+' первым символом
  var raw = el.value || '';
  var hasPlus = raw.trim().charAt(0) === '+';

  // Оставляем только цифры
  var val = raw.replace(/\D/g, '');

  // Поддержка дефолтных цифр из матрицы (как в твоей версии)
  var i = 0;
  var def = matrix.replace(/\D/g, '');
  if (def.length >= val.length) val = def;

  // Собираем по матрице
  var masked = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length
      ? val.charAt(i++)
      : i >= val.length
        ? ''
        : a;
  });

  // Плюс — только если он был введён в начале
  el.value = (hasPlus ? '+' : '') + masked;

  if (event.type === 'blur') {
    // если только '+' без цифр — очищаем
    if (el.value === '+') el.value = '';
  } else {
    setCursorPosition(el.value.length, el);
  }

  // это событие не зациклит обработчик из-за проверки isTrusted
  el.dispatchEvent(new Event('input'));
}

function setCursorPosition(pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) {
    elem.setSelectionRange(pos, pos);
  } else if (elem.createTextRange) {
    var range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}
