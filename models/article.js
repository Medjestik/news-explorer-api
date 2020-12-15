const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /https?:\/\/\S+/.test(value);
      },
      message: (props) => `${props.value} не корректная ссылка`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /https?:\/\/\S+/.test(value);
      },
      message: (props) => `${props.value} не корректная ссылка`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
