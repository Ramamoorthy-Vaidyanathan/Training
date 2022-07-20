// const { Queue, Worker, Job } = require('bullmq')
// // const IORedis = require('ioredis')


// // const connection = new IORedis();

// const queue = new Queue('Employee');

// // queue.add({
// //     everysec: 'everysec'
// // },{
// //     repeat:{
// //         cron: '*/1 * * * * *'
// //     }
// // }).catch(err => console.log(err))

// const addToQueue = async () => {
//     // const singleJob = await queue.add('job0', { name: 'red' },{priority: 0}, {
//     //     repeat: {
//     //       cron: '*/10 * * * *',
//     //     },
//     //   }); 
//     // const sinJob = await queue.add('job1', { name: 'blue' },{priority: 10}); 
//     // const singJob = await queue.add('job2', { name: 'black' },{priority: 3}); 
//     // await queue.add('paint', { colour: 'blue' }, { delay: 5000 }); Job will wait for 5 seconds
//     // const multiJobs = await queue.addBulk([
//     //     { name: 'job1', data: { name: 'car' } },
//     //     { name: 'job2', data: { name: 'house' } },
//     //     { name: 'job3', data: { name: 'boat' }, priority: 10 },
//     //   ]);
//     // const counts = await queue.getJobCounts('wait', 'completed', 'failed');
//     // console.log(counts)
//     const myJob = await queue.add('job1',
//         { foo: 'bar' },
//         {
//           repeat: {
//             every: 10000,
//             limit: 100
//           }
//         }
//       ).catch(err => console.log(err))

//     }

// addToQueue()

// const worker = new Worker('Employee',
//     async(job) => {
//         // await job.updateProgress(42);
//         return "Finished"
//     }
// )

// worker.run()
// // worker.concurrency = 5

// worker.on('completed', async (job, returnvalue) => {
//     // Do something with the return value.
//     // const res = await Job.fromId(queue, job.id)
//     console.log(job.id, returnvalue)
//   });
// worker.on('error', function(err){
//     console.log(err)
// })
// //   const repJob = async() => {
// //         const res = await queue.getRepeatableJobs()
// //         // console.log("repJob =>>>",res)
// //   }

// //   repJob()
