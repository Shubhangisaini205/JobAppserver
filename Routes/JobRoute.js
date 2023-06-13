const express = require("express");
const JobRouter = express.Router();
const {JobModel} = require("../Model/JobModel")

JobRouter.post("/add", async(req,res)=>{
    try {
         const job = new JobModel(req.body);
         await job.save();
         res.status(200).send({msg:"New Job has been added"})
    } catch (err) {
        console.log(err);
        res.status(400).send({msg:err.message})
    }
})


JobRouter.get("/", async(req,res)=>{
      let {role,language,limit,page,sort,} = req.query;
      let Query = {};
      if(role){
        Query.role=role
      }
      if(language){
        Query.language=language
      }
      let sortBy ={}
      if(sort){
         if(sort=="asc"){
          sortBy.postedAt=1
         }
         else if(sort=="desc")
         {
          sortBy.postedAt=-1
         }
        else{
          sortBy={}
         }
      }

    try {
         const jobs = await JobModel.find(Query).sort(sortBy).skip(limit*(page-1)).limit(limit)
        
         res.status(200).send(jobs)
    } catch (err) {
        console.log(err);
        res.status(400).send({msg:err.message})
    }
})


module.exports={
    JobRouter
}