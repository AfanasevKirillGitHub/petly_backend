const { Notice } = require('../../models');
const { HttpError } = require('../../helpers');

const getNoticeById = async (req, res) => {
  const { id } = req.params;
  const { lang = 'ua' } = req.query;
    
  const languages = {
      UA: 'ua',
      EN: 'en',
    };
    
    const allowedLanguages = Object.values(languages);
    const stringifiedAllowedLanguages = allowedLanguages.join(', ');

    if (!allowedLanguages.includes(lang)) {
      throw BadRequest(
        `Choose another type of language. Аvailable options: ${stringifiedAllowedLanguages}.`
      );
    }
    
    const fullNotice = await Notice.findById({ _id: id }).populate('owner');

    if (!fullNotice) {
      throw HttpError(404, 'Not found');
    }

    const { _id, category, title, name, birthdate, breed, sex, location, avatarURL, comments, price, favorite, owner } = fullNotice;
    const { city, region = {} } = location;
    const notice = {
      _id,
      category,
      title: title[lang],
      name,
      birthdate,
      breed: breed[lang],
      sex,
      location: { city: city[lang], region: region[lang] },
      comments: comments[lang],
      price,
      favorite,
      avatarURL,
      owner: {
        _id: owner.id,
        email: owner.email,
      },
    }

    res.status(200).json({
      message: 'Successfully',
      notice,
    });
};

module.exports = getNoticeById;
