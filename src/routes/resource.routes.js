const resourceCtrl = require("../controllers/resource.controller");
const router = require("../lib/Api")({
    name: "resources",
    prefix: "/resources",
    option: {
        allowAnonymous: false
    }
});

router.get("/", resourceCtrl.getAll);
router.post("/", resourceCtrl.create);
router.del("/:id", resourceCtrl.deleteById);
router.put("/:id", resourceCtrl.updateById);
router.get(
    "/search/page=:page&recordPerPage=:recordPerPage",
    resourceCtrl.countTotalAndGetRecordPerPage
);

module.exports = router;
