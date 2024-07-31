export default async function scoreData(){
    let scores = await fetch('/scores/all').then(r=>r.json()).then(d=>{
        console.log(d)
    })
    return scores;
}