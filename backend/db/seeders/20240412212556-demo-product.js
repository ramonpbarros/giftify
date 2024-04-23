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
        {
          wishlistId: 2,
          productName: 'Dinnerware Set',
          productDescription:
            'UNIQUE SET/ 4 DINNER PLATES (This is a beautiful set of four plates. Set is slightly discounted due to the fact that some of the profiles vary slightly and some may have a little bit of a wobble to them.)',
          productImgUrl:
            'https://i.etsystatic.com/15117434/r/il/8a5b96/1680890709/il_1588xN.1680890709_tad7.jpg',
          productPrice: 30.0,
          productLink:
            'https://www.etsy.com/listing/573430519/dinnerware-set-pottery-dinnerware?ref=anchored_listing&frs=1&sts=1',
        },
        {
          wishlistId: 2,
          productName:
            'Wood "COILED PLANTER" Matte Finish Mid Century Indoor Planter',
          productDescription:
            'The Coiled was designed to dress your plants in style, just like the owner! Our planters will modernize and bring out the beauty of your plants. "The Coiled" exudes a bauhaus/Japanese cool!',
          productImgUrl:
            'https://i.etsystatic.com/23301702/r/il/a87ee7/2580118473/il_1588xN.2580118473_fe5k.jpg',
          productPrice: 26.0,
          productLink:
            'https://www.etsy.com/listing/865339439/wood-coiled-planter-matte-finish-mid?click_key=1a2ff3abc045f25c33c364420f91dbbb43943b55%3A865339439&click_sum=43e6bb4b&ref=search2_top_narrowing_intent_modules_etsys_pick-2&sts=1',
        },
        {
          wishlistId: 2,
          productName: 'Fruit And Veggie Hammock',
          productDescription:
            'The original moka coffee pot: Moka Express is the original stovetop espresso maker, it provides the experience of the real Italian way of preparing a tasteful coffee, its unique shape and the inimitable gentleman with moustache date back to 1933, when Alfonso Bialetti invented it.',
          productImgUrl:
            'https://m.media-amazon.com/images/I/51+I23YIolL._AC_SX679_.jpg',
          productPrice: 40.0,
          productLink:
            'https://www.amazon.com/Bialetti-275-06-Express-6-Cup-Espresso/dp/B00004RFRU/?_encoding=UTF8&pd_rd_w=mNjFt&content-id=amzn1.sym.034d21de-f825-413a-8c94-7d57d209901e&pf_rd_p=034d21de-f825-413a-8c94-7d57d209901e&pf_rd_r=YKGXX0DNBEG5D2J8R0T9&pd_rd_wg=ItZWI&pd_rd_r=50a2606d-9e0d-4b63-8bdf-82d10a2f117d&ref_=pd_gw_gcx_gw_per_1&th=1',
        },
        {
          wishlistId: 3,
          productName: 'Mens Bracelet',
          productDescription:
            'Discover the essence of nautical elegance with this simple yet sophisticated bracelet, crafted from premium-grade sailing rope. Its skin-friendly material and comfortable design make it a delight to wear. The bracelet&apos;s size can be effortlessly adjusted with a gentle tug on the knots, ensuring a perfect fit for any wrist.',
          productImgUrl:
            'https://i.etsystatic.com/8683017/r/il/8b2d5b/3832630395/il_1588xN.3832630395_l2qp.jpg',
          productPrice: 27.68,
          productLink:
            'https://www.etsy.com/listing/1209132189/mens-bracelet-personalized-sailing-rope?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=home+decor&ref=sr_gallery-1-41&pop=1&sts=1&content_source=08e793dc28b2960dc71ec4c22a504c1496bdfa8e%253A1209132189&search_preloaded_img=1&organic_search_click=1',
        },
        {
          wishlistId: 3,
          productName: 'LED Table Lamp',
          productDescription:
            'Portable - The LED night lamp is battery-powered. It is equipped with a 1500 mAh rechargeable battery allowing up to 48 hours usage. You may connect the lamp to wall outlet all the time as a regular bedside night lamp. You may disconnect it as needed and carry the portable lamp during the night for extra safety. Or, bring it to outdoor camping as a spare light.',
          productImgUrl:
            'https://m.media-amazon.com/images/I/61v47BwBHkL._AC_SX679_.jpg',
          productPrice: 27.95,
          productLink:
            'https://www.amazon.com/OBright-Portable-Brightness-Rechargeable-Nightstand/dp/B087LWCGPS?pd_rd_w=g24Dt&content-id=amzn1.sym.d568a753-ec73-4eaa-82ba-ce55dec90b7a&pf_rd_p=d568a753-ec73-4eaa-82ba-ce55dec90b7a&pf_rd_r=222FXR0ANXA1DAS43GYX&pd_rd_wg=9wwGj&pd_rd_r=6f305290-d0f3-43d7-b3fe-d8f3a590c1de&pd_rd_i=B087LWCGPS&ref_=hmtspring_B087LWCGPS&th=1',
        },
        {
          wishlistId: 3,
          productName: 'Amazon Fire TV',
          productDescription:
            'Our most affordable Fire TV streaming stick - Enjoy fast streaming in Full HD. Comes with Alexa Voice Remote Lite.',
          productImgUrl:
            'https://m.media-amazon.com/images/I/61x4Sru7fTL._AC_SX679_.jpg',
          productPrice: 19.99,
          productLink:
            'https://www.amazon.com/fire-tv-stick-lite-latest-alexa-voice-remote-lite/dp/B091G4YP57/ref=pd_rhf_ee_s_rhf_1p_coldstart_d_sccl_2_2/136-5661296-0890101?pd_rd_w=U0YBu&content-id=amzn1.sym.b600c7d8-57ec-4c97-938f-a8d4e9e462a3&pf_rd_p=b600c7d8-57ec-4c97-938f-a8d4e9e462a3&pf_rd_r=50PABH9X61P48KPW256G&pd_rd_wg=5fw28&pd_rd_r=5ca4ae8b-4f1c-4efe-824f-8ab2bb723823&pd_rd_i=B091G4YP57&psc=1',
        },
        {
          wishlistId: 4,
          productName: 'Mens Bracelet',
          productDescription:
            '(4) Discover the essence of nautical elegance with this simple yet sophisticated bracelet, crafted from premium-grade sailing rope. Its skin-friendly material and comfortable design make it a delight to wear. The bracelet&apos;s size can be effortlessly adjusted with a gentle tug on the knots, ensuring a perfect fit for any wrist.',
          productImgUrl:
            'https://i.etsystatic.com/8683017/r/il/8b2d5b/3832630395/il_1588xN.3832630395_l2qp.jpg',
          productPrice: 27.68,
          productLink:
            'https://www.etsy.com/listing/1209132189/mens-bracelet-personalized-sailing-rope?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=home+decor&ref=sr_gallery-1-41&pop=1&sts=1&content_source=08e793dc28b2960dc71ec4c22a504c1496bdfa8e%253A1209132189&search_preloaded_img=1&organic_search_click=1',
        },
        {
          wishlistId: 4,
          productName: 'LED Table Lamp',
          productDescription:
            '(4) Portable - The LED night lamp is battery-powered. It is equipped with a 1500 mAh rechargeable battery allowing up to 48 hours usage. You may connect the lamp to wall outlet all the time as a regular bedside night lamp. You may disconnect it as needed and carry the portable lamp during the night for extra safety. Or, bring it to outdoor camping as a spare light.',
          productImgUrl:
            'https://m.media-amazon.com/images/I/61v47BwBHkL._AC_SX679_.jpg',
          productPrice: 27.95,
          productLink:
            'https://www.amazon.com/OBright-Portable-Brightness-Rechargeable-Nightstand/dp/B087LWCGPS?pd_rd_w=g24Dt&content-id=amzn1.sym.d568a753-ec73-4eaa-82ba-ce55dec90b7a&pf_rd_p=d568a753-ec73-4eaa-82ba-ce55dec90b7a&pf_rd_r=222FXR0ANXA1DAS43GYX&pd_rd_wg=9wwGj&pd_rd_r=6f305290-d0f3-43d7-b3fe-d8f3a590c1de&pd_rd_i=B087LWCGPS&ref_=hmtspring_B087LWCGPS&th=1',
        },
        {
          wishlistId: 4,
          productName: 'Amazon Fire TV',
          productDescription:
            '(4) Our most affordable Fire TV streaming stick - Enjoy fast streaming in Full HD. Comes with Alexa Voice Remote Lite.',
          productImgUrl:
            'https://m.media-amazon.com/images/I/61x4Sru7fTL._AC_SX679_.jpg',
          productPrice: 19.99,
          productLink:
            'https://www.amazon.com/fire-tv-stick-lite-latest-alexa-voice-remote-lite/dp/B091G4YP57/ref=pd_rhf_ee_s_rhf_1p_coldstart_d_sccl_2_2/136-5661296-0890101?pd_rd_w=U0YBu&content-id=amzn1.sym.b600c7d8-57ec-4c97-938f-a8d4e9e462a3&pf_rd_p=b600c7d8-57ec-4c97-938f-a8d4e9e462a3&pf_rd_r=50PABH9X61P48KPW256G&pd_rd_wg=5fw28&pd_rd_r=5ca4ae8b-4f1c-4efe-824f-8ab2bb723823&pd_rd_i=B091G4YP57&psc=1',
        },
        {
          wishlistId: 5,
          productName: 'Mens Bracelet',
          productDescription:
            '(5) Discover the essence of nautical elegance with this simple yet sophisticated bracelet, crafted from premium-grade sailing rope. Its skin-friendly material and comfortable design make it a delight to wear. The bracelet&apos;s size can be effortlessly adjusted with a gentle tug on the knots, ensuring a perfect fit for any wrist.',
          productImgUrl:
            'https://i.etsystatic.com/8683017/r/il/8b2d5b/3832630395/il_1588xN.3832630395_l2qp.jpg',
          productPrice: 27.68,
          productLink:
            'https://www.etsy.com/listing/1209132189/mens-bracelet-personalized-sailing-rope?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=home+decor&ref=sr_gallery-1-41&pop=1&sts=1&content_source=08e793dc28b2960dc71ec4c22a504c1496bdfa8e%253A1209132189&search_preloaded_img=1&organic_search_click=1',
        },
        {
          wishlistId: 5,
          productName: 'LED Table Lamp',
          productDescription:
            '(5) Portable - The LED night lamp is battery-powered. It is equipped with a 1500 mAh rechargeable battery allowing up to 48 hours usage. You may connect the lamp to wall outlet all the time as a regular bedside night lamp. You may disconnect it as needed and carry the portable lamp during the night for extra safety. Or, bring it to outdoor camping as a spare light.',
          productImgUrl:
            'https://m.media-amazon.com/images/I/61v47BwBHkL._AC_SX679_.jpg',
          productPrice: 27.95,
          productLink:
            'https://www.amazon.com/OBright-Portable-Brightness-Rechargeable-Nightstand/dp/B087LWCGPS?pd_rd_w=g24Dt&content-id=amzn1.sym.d568a753-ec73-4eaa-82ba-ce55dec90b7a&pf_rd_p=d568a753-ec73-4eaa-82ba-ce55dec90b7a&pf_rd_r=222FXR0ANXA1DAS43GYX&pd_rd_wg=9wwGj&pd_rd_r=6f305290-d0f3-43d7-b3fe-d8f3a590c1de&pd_rd_i=B087LWCGPS&ref_=hmtspring_B087LWCGPS&th=1',
        },
        {
          wishlistId: 5,
          productName: 'Amazon Fire TV',
          productDescription:
            '(5) Our most affordable Fire TV streaming stick - Enjoy fast streaming in Full HD. Comes with Alexa Voice Remote Lite.',
          productImgUrl:
            'https://m.media-amazon.com/images/I/61x4Sru7fTL._AC_SX679_.jpg',
          productPrice: 19.99,
          productLink:
            'https://www.amazon.com/fire-tv-stick-lite-latest-alexa-voice-remote-lite/dp/B091G4YP57/ref=pd_rhf_ee_s_rhf_1p_coldstart_d_sccl_2_2/136-5661296-0890101?pd_rd_w=U0YBu&content-id=amzn1.sym.b600c7d8-57ec-4c97-938f-a8d4e9e462a3&pf_rd_p=b600c7d8-57ec-4c97-938f-a8d4e9e462a3&pf_rd_r=50PABH9X61P48KPW256G&pd_rd_wg=5fw28&pd_rd_r=5ca4ae8b-4f1c-4efe-824f-8ab2bb723823&pd_rd_i=B091G4YP57&psc=1',
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
        wishlistId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
