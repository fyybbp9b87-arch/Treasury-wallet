let treasury = JSON.parse(localStorage.getItem("treasury")) || {
crowns:10000,
seeds:50000
};

updateTreasury();

function updateTreasury(){

document.getElementById("crownBalance").innerText = treasury.crowns;

document.getElementById("seedBalance").innerText = treasury.seeds;

localStorage.setItem("treasury", JSON.stringify(treasury));

}

function sendReward(){

const citizen = document.getElementById("citizen").value;

const type = document.getElementById("type").value;

const amount = parseInt(document.getElementById("amount").value);

const reason = document.getElementById("reason").value;

if(!citizen || !amount || amount <= 0){
alert("Fill all fields");
return;
}

if(type === "crowns" && treasury.crowns < amount){
alert("Not enough Crowns");
return;
}

if(type === "seeds" && treasury.seeds < amount){
alert("Not enough Seeds");
return;
}

let citizens = JSON.parse(localStorage.getItem("citizens")) || {};

if(!citizens[citizen]){
citizens[citizen] = {
crowns:0,
seeds:0,
history:[]
};
}

citizens[citizen][type] += amount;

citizens[citizen].history.push({
amount:amount,
type:type,
reason:reason,
time:new Date().toLocaleString()
});

treasury[type] -= amount;

localStorage.setItem("citizens", JSON.stringify(citizens));

updateTreasury();

const history = document.getElementById("history");

const div = document.createElement("div");

div.innerHTML = `
<hr>
${citizen}<br>
+${amount} ${type}<br>
${reason}<br>
${new Date().toLocaleString()}
`;

history.prepend(div);

alert("Reward Sent");

}
