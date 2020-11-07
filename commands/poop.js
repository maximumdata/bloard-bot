const values = [
  {
    value: 'poopoo',
    probability: '*'
  },
  {
    value: 'pee',
    probability: 0.2
  },
  {
    value: 'doodoo',
    probability: 0.2
  },
  {
    value: 'poopy',
    probability: 0.2
  },
  {
    value: 'peepee',
    probability: 0.2
  },
  {
    value: 'poop',
    probability: 0.05
  }
];

export default {
  name: 'poop',
  aliases: ['pee', 'poopoo', 'poopy', 'doodoo', 'peepee'],
  description: 'try to get the rare "poop" response',
  usage: '',
  execute: async function (message, args) {
    let i,
      pickedValue,
      randomNr = Math.random(),
      threshold = 0;

    for (i = 0; i < values.length; i++) {
      if (values[i].probability === '*') {
        continue;
      }

      threshold += values[i].probability;

      if (threshold > randomNr) {
        pickedValue = values[i].value;
        break;
      }

      if (!pickedValue) {
        pickedValue = values.filter(value => value.probability === '*')[0]
          .value;
      }
    }

    return await message.reply(pickedValue);
  }
};
