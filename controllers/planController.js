const database = require("../database/models")

async function getPlans() {
    const plans = await database.Plan.findAll();
    return plans;
};

async function getPlanById(id){
    const plan = await database.Plan.findByPk(id);
    return plan;
};

const planController = {
    renderPlanView: async function(req, res){
        const plans = await getPlans();
        if(res.locals.user != "empty"){
            const plan = await getPlanById(req.session.userLogged.plan_id);
            res.render('plans', { plans, plan });
        }else {
            res.render('plans', { plans });
        }
    },
    
    renderCheckoutPlanView: async function(req, res){
        let { id } = req.params;
        const { planID } = req.cookies;
        if(id == undefined){
            id = planID;
        }
        const plan = await getPlanById(id);
        res.cookie("planID", id);
        res.render('plans-checkout', { plan });
    }
};

module.exports = planController;