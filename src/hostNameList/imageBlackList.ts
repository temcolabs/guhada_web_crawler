const imageBlackList = [
  "https://cdn.shopify.com/s/files/1/0754",
  "https://cs1.0ps.us/305-305/opplanet-altama-maritime-assault-mid-tactical-boot-mens-black-9-5us-wide-333001-9-5-w-main.webp",
  "https://cs1.0ps.us/200-200/opplanet-spiderwire-logo-09-2023.webp",
  "https://csl.0ps.us/assets-36fd9c36ca4/base/desktop/img/footer/guarantee-icons.png",
  "https://balaan.com/cdn/shop/files/men.png?v=1730110815",
  "https://balaan.com/cdn/shop/files/women_223a5b58-211f-403a-8c52-01945ae04d6b.png?v=1730110793",
  "https://balaan.com/cdn/shop/files/kids_2f68846b-073c-43c5-8ab9-a71b65b876e6.png?v=1731021898",
  "https://balaan.com/cdn/shop/files/preloved.png?v=1730276089",
  "https://balaan.com/cdn/shop/files/golf.png?v=1730110839",
  "https://cs1.0ps.us/200-200/opplanet-granite-gear-logo-08-2023.webp",
  "https://cs1.0ps.us/200-200/opplanet-kelty-logo-08-2023.webp",
  "https://cs1.0ps.us/200-200/opplanet-mountain-hardwear-logo-08-2023.webp",
  "https://cs1.0ps.us/200-200/opplanet-ultimate-direction-logo-08-2023.webp",
  "https://cs1.0ps.us/200-200/opplanet-big-agnes-logo-08-2023.webp",
  "https://cs1.0ps.us/305-305/opplanet-free-shipping-2023.webp",
  "https://cs1.0ps.us/305-305/opplanet-cs-12-01-24-best-of-camping-furniture.webp",
  "https://cs1.0ps.us/305-305/opplanet-cs-12-01-24-best-of-camping-kitchen.webp",
  "https://cs1.0ps.us/305-305/opplanet-cs-12-01-24-best-of-camping-backpacks.webp",
  "https://cs1.0ps.us/305-305/opplanet-altama-maritime-assault-mid-tactical-boot-mens-black-9-5us-wide-333001-9-5-w-main.webp",
  "https://balaan.com/cdn/shop/files/image_1_b2b61b25-74e7-43e6-a867-fcd5639a3d65.png?v=1714034943",
  "https://balaan.com/cdn/shop/files/3_679ce675-abe1-4a86-92ef-84c26b124d6e.png?v=1714361765",
  "https://balaan.com/cdn/shop/files/image_2_616130a7-ecec-42b6-8f8b-e55ccd4f0621.png?v=1714033352",
  "https://balaan.com/cdn/shop/files/5_b9faffe6-0156-44e1-9c98-6e2d21e42316.png?v=1714362462",
  "https://cdn.modesens.com/static/img/countryflags.png",
  "https://cdn.modesens.com/static/img/countryflags.png",
  "https://cdn-qiniu.poizonapp.com/news_byte30068byte_85e1d40f1c40e85573d41234368ed6b1_w150h150.png?x-oss-process=image/format,webp/resize,w_120,h_120",
  "https://cdn-img.poizon.com/node-common/37e9d55b-2153-4be6-979b-5529f996ce37-1388-780.png?x-oss-process=image/format,webp/resize,w_1500",
  "https://cdn-img.poizon.com/node-common/51c5e16a-7d44-8c27-eb95-7ffe0b726264-371-206.png",
  "https://cdn-img.poizon.com/node-common/20a8e146-124c-dffc-2a59-35ff402aac5d-1167-1116.png?x-oss-process=image/format,webp/resize,w_700",
  "https://cdn-img.poizon.com/node-common/c21b7d3d-4ba1-54a8-d39d-add1af50ac1a-1168-657.png?x-oss-process=image/format,webp/resize,w_780",
  "https://cdn-img.poizon.com/node-common/e8835883-0375-7b0d-0e89-397e687c7766-1169-657.png?x-oss-process=image/format,webp/resize,w_780",
  "https://cdn-img.poizon.com/node-common/febec4b6-f56c-cb8d-d73b-9ae153241587-1169-657.png?x-oss-process=image/format,webp/resize,w_780",
  "https://cdn-img.poizon.com/node-common/f29ec5c9-7a07-954c-0c7f-d39ab463965f-2561-460.png?x-oss-process=image/format,webp/resize,h_2400",
  "https://cdn-img.poizon.com/node-common/ba22594b-d4d3-1e39-5706-5cb7d5d346b4-2385-1023.png?x-oss-process=image/format,webp/resize,w_1590",
  "https://cdn-img.poizon.com/node-common/a4e09d42-a139-478c-2b11-909698e4c3d3-4320-1068.png?x-oss-process=image/format,webp/resize,h_712",
  "https://www.gebnegozionline.com/static/version1726560558/frontend/Alpenite/gebnegozio/en_US//images/geb_logo.png",
  "https://www.gebnegozionline.com/static/version1726560558/frontend/Alpenite/gebnegozio/en_US/images/loader-1.gif",
  "https://www.gucci.com/_ui/responsive/common/images/store-locator-maps/pin-retailer.png",
  "https://www.gebnegozionline.com/media/wysiwyg/3_18_1.png",
  "https://www.gebnegozionline.com/media/wysiwyg/2_18_1.png",
  "https://www.gebnegozionline.com/media/wysiwyg/4_18_1.png",
  "https://www.gebnegozionline.com/media/wysiwyg/6_10_1.png",
  "https://giraffehousevn.com/assets/f5dc882e/images/progress_bar.gif",
  "https://m.media-amazon.com/images/S/sash/2KViI4b7ZZCNtr3.png",
  "https://m.media-amazon.com/images/S/sash/Z8YwjOjqIHxqujG.png",
  "https://m.media-amazon.com/images/I/31a3suMl0HL.jpg",
  "https://m.media-amazon.com/images/S/sash/McBZv0ZvnbehkIx.png",
  "https://m.media-amazon.com/images/S/sash/ZpbG74laklgnz-i.png",
  "https://m.media-amazon.com/images/S/sash/2KViI4b7ZZCNtr3.png",
  "https://m.media-amazon.com/images/G/15/personalization/ybh/loading-4x-gray._CB485916907_.gif",
  "https://www.gucci.com/_ui/responsive/common/20241204062141/images/sprite-standard.png",
  "https://www.gucci.com/_ui/responsive/common/images/store-locator-maps/pin-servicecenter-active.png",
];

export default imageBlackList;
