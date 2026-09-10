let activeEffect = null;

function signal(initialValue) {
  let value = initialValue;
  const subscribers = new Set();

  return {
    get value() {
      if (activeEffect) {
        subscribers.add(activeEffect);
        activeEffect.dependencies.add(this);
      }
      return value;
    },

    set value(newValue) {
      if (value !== newValue) {
        value = newValue;
        subscribers.forEach((effect) => {
          effect();
        });
      }
    },
  };
}

function effect(fn) {
  fn.dependencies = new Set();
  activeEffect = fn;

  fn();

  activeEffect = null;

  return fn;
}

const count = signal(0);
const user = signal("jhon");

effect(() => {
  if (count.value > 0) {
    console.log("effect :", user.value);
  }
});

count.value = 1;
count.value = 0;
user.value = "david";
count.value = 1;
