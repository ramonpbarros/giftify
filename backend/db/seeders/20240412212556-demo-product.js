'use strict';

const { Product } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Product.bulkCreate([
        {
          wishlistId: 1,
          productName: 'Soccer Ball',
          productDescription:
            'A recreational soccer ball with a resilient butyl bladder for casual games',
          productImgUrl:
            'https://m.media-amazon.com/images/I/61ESBrdZUxL._AC_SY879_.jpg',
          productPrice: 18.0,
          productLink:
            'https://www.amazon.com/adidas-Unisex-Adult-Starlancer-Soocer-White/dp/B0C1XP5CKT/ref=sr_1_5?crid=1UG944WUE7KQ4&dib=eyJ2IjoiMSJ9.n2IVLfFO2lB6YIJRNzvTqbdChgfwwgd29WsJEa6H-pkNNRLnEENramk__JuKYaD2Gv3HMV17xj86cEQmDJJkYSE_Bkq0F0o0m9Pa6RMU8CAcb6UJ9hGWTu6LkUIUvGTfUNHaZIcrKJRnLzWOtHhi8vdBs0jR3DTw2VVkMCPGOQO5FcMEWQSIuoMM7NIN18us3zfBZPhFfBLJMzz7DaHZR7cCXb69xDZLl6LHm77Ww7qb-asd3JK0-s-E9i-IWHkI0pEybb4Q800Cla3E6OhViC2dmOOgU7qzepTUWiHcrNc.M_5mT7ai_m-cYosGK1NTP6_PhLLbKcrtQVzGl2a3SU8&dib_tag=se&keywords=soccer+ball&qid=1712959387&sprefix=soccer+ball%2Caps%2C137&sr=8-5',
        },
        {
          wishlistId: 1,
          productName: 'Umbrella',
          productDescription:
            'Compact umbrella for travel: easily portable, our travel umbrella weighs 15 oz and folds down to a mere 11.5" (29cm). It works great as a pocket umbrella, small umbrella for purse, and car umbrella',
          productImgUrl:
            'https://m.media-amazon.com/images/I/61H9y1lX+NL._AC_SY879_.jpg',
          productPrice: 26.99,
          productLink:
            'https://www.amazon.com/Windproof-Travel-Umbrella-Rain-Compact/dp/B0160HYB8S/ref=sr_1_1_sspa?crid=438T5DWTS063&dib=eyJ2IjoiMSJ9.PX6cuJopn79h7pFT46ht4oOv_LpHjRhgUGtZ4hHUnc3u2F53gQEuH8-T2-WyO-lNB8nlwv2IyDxmmd39GFfGOC6qJL0VTI79BejbJoGm1-jNMwVsKWBOtbuNH7_fJbaf3tLiI_tK1AtFAW8IchHS3_iQUaNm04wQUJUeALcHI-QrASPLazuos6Fdheu4LIwnISSagVuNn-7SV5BtqRFI84zKJb6dThPDqjmFcMvV1apApY0BIVinlv_MGMFyOvbYRUoL72N4CzLn5t62s6yJ3Ts-HdtAK5FrgC8zVxa9p_o.2VgGmrBfceLt7RVaGc3-gbCBCdrAWnaW7CeZQ07MQWQ&dib_tag=se&keywords=umbrella&qid=1712959789&sprefix=%2Caps%2C231&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&smid=A1WFZRQPDGQ55T',
        },
        {
          wishlistId: 1,
          productName: 'Expresso Maker',
          productDescription:
            'The original moka coffee pot: Moka Express is the original stovetop espresso maker, it provides the experience of the real Italian way of preparing a tasteful coffee, its unique shape and the inimitable gentleman with moustache date back to 1933, when Alfonso Bialetti invented it.',
          productImgUrl:
            'https://m.media-amazon.com/images/I/51+I23YIolL._AC_SX679_.jpg',
          productPrice: 40.0,
          productLink:
            'https://www.amazon.com/Bialetti-275-06-Express-6-Cup-Espresso/dp/B00004RFRU/?_encoding=UTF8&pd_rd_w=mNjFt&content-id=amzn1.sym.034d21de-f825-413a-8c94-7d57d209901e&pf_rd_p=034d21de-f825-413a-8c94-7d57d209901e&pf_rd_r=YKGXX0DNBEG5D2J8R0T9&pd_rd_wg=ItZWI&pd_rd_r=50a2606d-9e0d-4b63-8bdf-82d10a2f117d&ref_=pd_gw_gcx_gw_per_1&th=1',
        },
      ]);
    } catch (error) {
      console.error('Error during Product bulkCreate:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Products';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        wishlistId: { [Op.in]: [1] },
      },
      {}
    );
  },
};
