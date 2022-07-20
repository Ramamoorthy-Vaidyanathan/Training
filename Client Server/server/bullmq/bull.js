const Bull = require('bull');

const myFirstQueue = new Bull('MyQueue');

const myfunc = async() => {
    const job = await myFirstQueue.add({
        foo: 'bar'
    })

    const myJob = await myFirstQueue.add(
        { foo: 'bar' },
        {
          repeat: {
            every: 10000,
            limit: 10
          }
        }
      );
}


myfunc()

myFirstQueue.process((job) => {
    console.log(job.data)
})

myFirstQueue.on('completed', job => {
    console.log(`Job with id ${job.id} has been completed`);
  })