const whiteUrlList = [
  "giraffehousevn.com",
  "lacoste.pl",
  "lacoste.com",
  "jlindebergusa.com",
  "mammut.com",
  "woolpower.se",
  "baracuta.com",
  "poizon.com",
  "buyma.com",
  "h-brands.com",
  "genteroma.com",
  "thebs.com",
  "goat.com",
  "samuraysport.com",
  "modesens.com",
  "carlsgolfland.com",
  "llaud.nl",
  "animasportiva.com",
  "cettire.com",
  "shooos.com",
  "bivouacannarbor.com",
  "osprey.com",
  "blackdiamondequipment.co.kr",
  "pod7kilo.cz",
  "en.aventurenordique.com",
  "suitableshop.com",
  "sporttechstore.com",
  "golfio.com",
  "24s.com",
  "www.campsaver.com",
  "worldwidegolfshops.com",
  "golfposer.com",
  "function18.com",
  "amazon.com",
  "opticsplanet.com",
  "campsaver.com",
  "golflocker.com",
  "kickscrew.com",
  "globalgolf.com",
  "www.acnestudios.com/us/en",
  "www.poizon.com",
  "balaan.com",
  "christiandior.com",
  "pyonnia.com",
  "www.karengleason.shop",
  "www.mackage.com",
  "www.altitude-sports.com",
  "reversible.com",
  "shop.r10s.jp",
  "www.miumiu.com",
  "inc.nobis.com",
  "swarovski.com",
  "www.acnestudios.com",
  "solesense.com",
  "voostore.com",
  "endclothing.com",
  "cdn.shopify.com",
  "www.credomen.com",
  "gaphiria.com",
  "www.themixshoes.com",
  "harresoe.com",
  "thumbnail.image.rakuten.co.jp",
  "cdn11.bigcommerce.com",
  "kr.stussy.com",
  "paerlourx.shop",
  "farfetch",
  "www.stussy.com",
  "www.frmoda.com",
  "www.gebnegozionline.com",
  "www.colognese.com",
  "mulberry.com",
  "www.levelshoes.com",
  "www.baltini.com",
  "ateliernewyork.com",
  "giglio.com",
  "selfridges.com",
  "www.giraffehousevn.com",
  "marais.com.au",
  "baycrews.jp",
  "www.kaufmann-store.com",
  "www.ln-cc.com",
  "ko.club21.com",
  "oneness-article.com",
  "www.capsuletoronto.com",
  "firstbtq.com",
  "stoy.com",
  "andersen-andersen.com",
  "www.sublime.bz",
  "gretta.co",
  "stuart.scene7.com",
  "dressed.com",
  "www.workingclassheroes.co.uk",
  "www.soarrunning.com",
  "shop.doverstreetmarket.com",
  "paulsmith.com",
  "www.meadowweb.com",
  "reservesupplycompany.com",
  "shop.kind.co.jp",
  "res.cloudinary.com",
  "www.fjellsport.no",
  "www.brynje-shop.com",
  "www.norskysvetr.cz",
  "www.nordiclife.co.uk",
  "store.50910.jp",
  "www.cultizm.com",
  "alpina-us.com",
  "kith.com",
  "shope9.com",
  "www.e9planet.com",
  "outdoorsclothe.com",
  "climbingwears.com",
  "www.furtherfaster.co.nz",
  "content.wolfswinkel.nl",
  "www.hobbi.gr",
  "www.wardow.com",
  "www.intersporteindhoven.nl",
  "www.jurassicoutdoor.com",
  "www.rigad.com",
  "www.granitegear.com",
  "www.eytys.com",
  "ienki-ienki.com",
  "www.jlindebergusa.com",
  "www.jlindeberg.com",
  "shop.rcoutfitter.com",
  "static.sportfits.de",
  "www.stilealpino.net",
  "oliverpeoples.com",
  "www.opticabassol.com",
  "bdgastore.com",
  "www.campmor.com",
  "nordarun.com",
  "laced.com.au",
  "us.nanamica.com",
  "wildgear.it",
  "zaspero.ch",
  "www.outbackjacks.ie",
  "www.oc2ber.com",
  "novelship.com",
  "droledemonsieur.com",
  "eu.zamberlan.com",
  "www.mysteryranchuk.com",
  "www.outlandusa.com",
  "rab.equipment",
  "www.humphriesshoes.co.uk",
  "www.ilduomo.it",
  "global.ecco.com",
  "au.ecco.com",
  "us.ecco.com",
  "us.shein.com",
  "my.ecco.com",
  "ca.ecco.com",
  "ecco",
  "DIOR",
  "PRADA",
  "MAXMARA",
  "MONCLER",
  "CELINE",
  "AMI",
  "BARBOUR",
  "BRUNELLOCUCINELLI",
  "CHLOE",
  "HERNO",
  "LOEWE",
  "MACKAGE",
  "MIUMIU",
  "NOBIS",
  "SAINTLAURENTPARIS",
  "STONEISLAND",
  "SWAROVSKI",
  "THOMBROWNE",
  "UGG",
  "VALENTINO",
  "ZZEGNA",
  "BOTTEGAVENETA",
  "A.P.C",
  "apcstore",
  "SALVATOREFERRAGAMO",
  "CANADAGOOSE",
  "GUCCI",
  "ACNESTUDIOS",
  "ISABELMARANT",
  "BALENCIAGA",
  "CPCOMPANY",
  "OFF-WHITE",
  "off---white",
  "ALEXANDERMCQUEEN",
  "GIVENCHY",
  "FENDI",
  "MARCELOBURLON",
  "SALOMON",
  "AUTRY",
  "MM6",
  "PLEATSPLEASEISSEYMIYAKE",
  "PATAGONIA",
  "TORYBURCH",
  "OURLEGACY",
  "THEORY",
  "MOOSEKNUCKLES",
  "STUSSY",
  "ROGERVIVIER",
  "TODS",
  "PARAJUMPERS",
  "VIVIENNEWESTWOOD",
  "MOSCHINO",
  "MARINESERRE",
  "MARNI",
  "VERSACE",
  "TOMFORD",
  "VETEMENTS",
  "PALMANGELS",
  "MULBERRY",
  "CARHARTT",
  "BALLY",
  "BIRKENSTOCK",
  "COLUMBIA",
  "ALLSAINTS",
  "BURBERRY",
  "COACH",
  "CARHARTTWIP",
  "ALAIA",
  "AMIRI",
  "ACOLDWALL",
  "ARCTERYX",
  "ASPESI",
  "BAOBAOISSEYMIYAKE",
  "CHURCH`S",
  "COMMEDESGARCONS",
  "SAINTJAMES",
  "BERLUTI",
  "HELENKAMINSKI",
  "DR.MARTENS",
  "1017ALYX9SM",
  "DRAGONDIFFUSION",
  "ETRO",
  "MSGM",
  "WOOLRICH",
  "DEPARTMENT5",
  "LANVIN",
  "LEMAIRE",
  "JILSANDER",
  "LOROPIANA",
  "NEILBARRETT",
  "JWANDERSON",
  "ERMENEGILDOZEGNA",
  "IHNOMUHNIT",
  "PTTORINO",
  "GANNI",
  "HOKAONEONE",
  "DSQUARED2",
  "DUVETICA",
  "SELF-PORTRAIT",
  "COURREGES",
  "HELMUTLANG",
  "HOMMEPLISSEISSEYMIYAKE",
  "KENZO",
  "DANTON",
  "JACQUEMUS",
  "FEAROFGOD",
  "JUNYAWATANABE",
  "HILLEBERG",
  "CAMPER",
  "MAISONKITSUNE",
  "EXTREMITIES",
  "LAMBDAGOLF",
  "GOLDENGOOSE",
  "G/FORE",
  "ARIES",
  "LARDINI",
  "FREDPERRY",
  "LAVENHAM",
  "HERONPRESTON",
  "ANDERSENANDERSEN",
  "ISLANDSLIPPER",
  "AXELARIGATO",
  "OAKLEY",
  "REPETTO",
  "TENC",
  "THENORTHFACE",
  "STUARTWEITZMAN",
  "OSPREY",
  "TOTEME",
  "STUDIONICHOLSON",
  "PARABOOT",
  "MIHARAYASUHIRO",
  "WILDDONKEY",
  "Y-3",
  "SANTONI",
  "PAJAK",
  "SOARRUNNING",
  "NEWBALANCE",
  "SPORTY&RICH",
  "PAULSMITH",
  "PLEASURES",
  "PORTER-YOSHIDA&CO",
  "yproject",
  "VANS",
  "ORTOVOX",
  "SACAI",
  "TOMMYHILFIGER",
  "ALPHAINDUSTRIES",
  "BLACKDIAMOND",
  "BRYNJE",
  "ASTORFLEX",
  "BARACUTA",
  "BELSTAFF",
  "AURALEE",
  "BRAINDEAD",
  "AFFIX",
  "ALTRA",
  "424",
  "ANATOMICA",
  "BODE",
  "ALDEN",
  "BIGAGNES",
  "ADIDAS",
  "BILLIONAIREBOYSCLUB",
  "ALPINA",
  "ANDWANDER",
  "ASICS",
  "AKU",
  "BASERANGE",
  "ECCO",
  "DEUS",
  "CUMULUS",
  "CLEF",
  "CHAMPION",
  "CROCKETT&JONES",
  "CLARKS",
  "DROLEDEMONSIEUR",
  "CRYSTALHAZE",
  "BUTTERO",
  "E9",
  "CEP",
  "CALVINKLEIN",
  "CALLAWAY",
  "CAVEMPT",
  "DEUTER",
  "DIME",
  "CASABLANCA",
  "DIESEL",
  "FJALLRAVEN",
  "GREGORY",
  "ENGINEEREDGARMENTS",
  "FEDELI",
  "GRANITEGEAR",
  "EYTYS",
  "LACOSTE",
  "JERUSALEMSANDALS",
  "HUGOBOSS",
  "HENDERSCHEME",
  "HAGLOFS",
  "HOWLIN'",
  "JOHNSMEDLEY",
  "LASPORTIVA",
  "HYDROGEN",
  "IENKIIENKI",
  "INVERALLAN",
  "KOLOR",
  "HAI",
  "KAPTAINSUNSHINE",
  "J.LINDEBERG",
  "LEVI`S",
  "LOWA",
  "LUNDHAGS",
  "KLATTERMUSEN",
  "MEINDL",
  "MONTURA",
  "MAMMUT",
  "MACKINTOSH",
  "MOUNTAINHARDWEAR",
  "MOORER",
  "MERZB.SCHWANEN",
  "MARKET",
  "MARK&LONA",
  "MARGARETHOWELL",
  "MARSELL",
  "MYSTERYRANCH",
  "NIKE",
  "OUTDOORRESEARCH",
  "OLIVERPEOPLES",
  "NEIGHBORHOOD",
  "NEEDLES",
  "NORDA",
  "NANAMICA",
  "NIGELCABOURN",
  "ZAMBERLAN",
  "ROHNER",
  "WOOLPOWER",
  "REDWING",
  "RAB",
  "UNDERARMOUR",
  "WESTERNMOUNTAINEERING",
  "RUDYPROJECT",
  "TITLEIST",
  "ZASPERO",
  "PXG",
  "PETZL",
  "SOUTH2WEST8",
  "REPRESENT",
  "SPALWART",
  "WALESBONNER",
  "WTAPS",
  "SUNFLOWER",
  "SUNNEI",
  "RAINS",
  "SEBAGO",
  "YMC",
  "VOLCOM",
  "WHITEMOUNTAINEERING",
  "PALOMAWOOL",
  "SEFR",
  "YOGIFOOTWEAR",
  "SWIX",
  "SCARPA",
  "TEKLA",
  "PETERMILLAR",
  "TILAK",
  "CHRISTIANLOUBOUTIN",
  "ENTIRESTUDIOS",
];
export default whiteUrlList;
