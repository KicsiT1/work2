function CurentDate()
{
    const ma = new Date();
    const ev = ma.getFullYear();
    const honap = String(ma.getMonth() + 1).padStart(2, '0');
    const nap = String(ma.getDate()).padStart(2, '0');
    return `${ev}-${honap}-${nap}`;
}
const PlusIcon=document.getElementsByClassName("plus")
const Container=document.querySelector(".card_flex_container")
class TaskCard
{
    constructor(id)
    {
        this.id=id
        this.Date=CurentDate()
        this.text="";
    }

    RenderCard()
    {
        const card=document.createElement("div")
        card.classList.add("card")
        card.innerHTML=`
            <p>${this.Date}</p>
            <textarea placeholder="Írj be magadnak feladatot" rows="5" cols="40"></textarea>
            <div>
                <span>${this.id}</span>
                <button class="btn1"><i class="fa-solid fa-check"></i></button>
                <button class="btn2"><i class="fa-solid fa-x"></i></button>
            </div>
        `;

        const textarea=card.querySelector("textarea")
        const button1=card.querySelector(".btn1")
        const button2=card.querySelector(".btn2")

        textarea.addEventListener("input",()=>{
            this.text=textarea.value
            SaveTask()
        })

        button1.addEventListener("click",()=>{
            card.style.backgroundColor = "#559e60ff";
            textarea.style.backgroundColor = "#559e60ff";
            textarea.disabled=true
            SaveTask()
        })

        button2.addEventListener("click",()=>{
            card.remove();
            SaveTask()
        })

        return card
    }
}

function AddTask()
{
    const id = Container.children.length + 1;
    const newTask = new TaskCard(id);
    card=newTask.RenderCard();
    Container.appendChild(card)
    SaveTask()
}

function SaveTask()
{
    const Tasks=[]

    document.querySelectorAll(".card").forEach((card,index) =>{
        const textarea=card.querySelector("textarea")
        const date=card.querySelector("p").textContent
        const id=index+1
        const text=textarea.value
        const Done=textarea.disabled
        Tasks.push({id,date,text,Done})
    })
    localStorage.setItem("Tasks",JSON.stringify(Tasks))
}

function LoadTasks()
{
    const stored=localStorage.getItem("Tasks")
    if(!stored)
    {
        return
    }

    const Tasks=JSON.parse(stored)
    Tasks.forEach(t=>{

        const newTask= new TaskCard(t.id)
        newTask.Date=t.date
        newTask.text=t.text

        const card = newTask.RenderCard();
        const textarea = card.querySelector("textarea");
        textarea.value = t.text;

        if (t.Done) {
            card.style.backgroundColor = "#559e60ff";
            textarea.style.backgroundColor = "#559e60ff";
            textarea.disabled = true;
        }
        
        Container.appendChild(card);
    })
}

window.addEventListener("DOMContentLoaded", () => {
    LoadTasks();
});