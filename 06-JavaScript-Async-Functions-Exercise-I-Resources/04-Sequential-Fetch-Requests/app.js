// async function fetchSequential() {
//       const res1 = await fetch('https://swapi.dev/api/people/1')
//       .then(res => res.json());
//       console.log(res1)
//       const res2 = await fetch('https://swapi.dev/api/people/2')
//       .then(res => res.json());
//       console.log(res2)
// }

async function fetchSequentialAsyncAwait()
{
      const res1 = await fetch('https://swapi.dev/api/people/1');
      const data1 = await res1.json();
      console.log(data1);

      const res2 = await fetch('https://swapi.dev/api/people/2');
      const data2 = await res2.json();
      console.log(data2);
}