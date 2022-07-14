import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

import express from "express"
import bodyParser from "body-parser"

const PORT = process.env.PORT || 3001
const app = express();

import cors from "cors"

import dbConnect from "./utils/dbConnect.js"
import Boss from "./schemas/Boss.js"

import WebSocket, { WebSocketServer } from "ws"
const wss = new WebSocketServer({ server: app })

wss.on('connection', ws => {
    ws.broadcast = (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) client.send(data);
        });
    }
    ws.on('message', async message => {
        message = JSON.parse(message)
        if (message.method === "update") {
            let name = message.target
            let bool = message.finished

            const found = await Boss.findOneAndUpdate({ name: name }, { finished: bool }, { new: true })

            if (found) {
                ws.broadcast(JSON.stringify({ success: true, type: "boss_update", data: found }))
                return
            }
            ws.send(JSON.stringify({ success: false, error: "Entry not found..." }))
        }
    })
    ws.send(JSON.stringify({ success: true, message: "WebSocket connection established! "}))
})

app.use(cors({
    origin: '*'
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dbConnect()

const bosses = { vanilla: [], calamity: [], all: [] }

// MINIBOSS
bosses.calamity.push({ name: "Giant Clam", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/7/72/Giant_Clam_map.png/20px-Giant_Clam_map.png" })
bosses.calamity.push({ name: "Earth Elemental", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/3/32/Aftershock.png/20px-Aftershock.png" })
bosses.calamity.push({ name: "Cloud Elemental", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/9/99/Eye_of_the_Storm.png/25px-Eye_of_the_Storm.png" })
bosses.calamity.push({ name: "Cragmaw Mire", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/1/14/Spent_Fuel_Container.png/17px-Spent_Fuel_Container.png" })
bosses.calamity.push({ name: "Armored Digger", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/9/95/Armored_Digger_Head.png/20px-Armored_Digger_Head.png" })
bosses.calamity.push({ name: "Great Sand Shark", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/b/b0/Great_Sand_Shark_map.png/20px-Great_Sand_Shark_map.png" })
bosses.calamity.push({ name: "Plaguebringer", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/8/8f/Plague_Cell_Canister.png/15px-Plague_Cell_Canister.png" })
bosses.calamity.push({ name: "Mauler", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/f/f7/Mauler_Banner_%28placed%29.png/10px-Mauler_Banner_%28placed%29.png" })
bosses.calamity.push({ name: "Colossal Squid", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/6/6e/Calamari.png/20px-Calamari.png" })
bosses.calamity.push({ name: "Reaper Shark", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/f/fb/Valediction.png/25px-Valediction.png" })
bosses.calamity.push({ name: "Eidolon Wyrm", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/6/65/Lumenyl.png/25px-Lumenyl.png" })
bosses.calamity.push({ name: "Nuclear Terror", phase: "miniboss", image: "https://calamitymod.wiki.gg/images/thumb/1/16/Gamma_Hydra.png/22px-Gamma_Hydra.png" })

// PRE-HARDMODE
bosses.vanilla.push({ name: "King Slime", phase: "pre-hardmode", image: "https://terraria.wiki.gg/images/5/5e/Map_Icon_King_Slime.png" })
bosses.vanilla.push({ name: "Eye of Cthulhu", phase: "pre-hardmode", image: "https://terraria.wiki.gg/images/a/a1/Map_Icon_Eye_of_Cthulhu_%28first_form%29.png" })
bosses.vanilla.push({ name: "Eater of Worlds", phase: "pre-hardmode", image: "https://terraria.wiki.gg/images/7/75/Map_Icon_Eater_of_Worlds.png" })
bosses.vanilla.push({ name: "Brain of Cthulhu", phase: "pre-hardmode", image: "https://terraria.wiki.gg/images/f/fb/Map_Icon_Brain_of_Cthulhu.png" })
bosses.vanilla.push({ name: "Queen Bee", phase: "pre-hardmode", image: "https://terraria.wiki.gg/images/c/c6/Map_Icon_Queen_Bee.png" })
bosses.vanilla.push({ name: "Skeletron", phase: "pre-hardmode", image: "https://terraria.wiki.gg/images/f/f4/Map_Icon_Skeletron.png" })
bosses.vanilla.push({ name: "Deerclops", phase: "pre-hardmode", image: "https://terraria.wiki.gg/images/c/c9/Map_Icon_Deerclops.png" })
bosses.vanilla.push({ name: "Wall of Flesh", phase: "pre-hardmode", image: "https://terraria.wiki.gg/images/d/d4/Map_Icon_Wall_of_Flesh.png" })
bosses.calamity.push({ name: "Desert Scourge", phase: "pre-hardmode", image: "https://calamitymod.wiki.gg/images/thumb/6/6d/Desert_Scourge_map.png/25px-Desert_Scourge_map.png" })
bosses.calamity.push({ name: "Crabulon", phase: "pre-hardmode", image: "https://calamitymod.wiki.gg/images/thumb/9/9f/Crabulon_map.png/25px-Crabulon_map.png" })
bosses.calamity.push({ name: "The Hive Mind", phase: "pre-hardmode", image: "https://calamitymod.wiki.gg/images/thumb/d/d2/Hive_Mind_map.png/25px-Hive_Mind_map.png" })
bosses.calamity.push({ name: "The Perforators", phase: "pre-hardmode", image: "https://calamitymod.wiki.gg/images/thumb/e/e3/Perforator_Hive_map.png/25px-Perforator_Hive_map.png" })
bosses.calamity.push({ name: "The Slime God", phase: "pre-hardmode", image: "https://calamitymod.wiki.gg/images/thumb/0/0c/Ebonian_Slime_God_map.png/25px-Ebonian_Slime_God_map.png,https://calamitymod.wiki.gg/images/thumb/9/99/Crimulan_Slime_God_map.png/25px-Crimulan_Slime_God_map.png" })

// HARDMODE
bosses.vanilla.push({ name: "Queen Slime", phase: "hardmode", image: "https://terraria.wiki.gg/images/9/95/Map_Icon_Queen_Slime.png" })
bosses.vanilla.push({ name: "The Twins", phase: "hardmode", image: "https://terraria.wiki.gg/images/6/65/Map_Icon_Retinazer_%28first_form%29.png,https://terraria.wiki.gg/images/9/9c/Map_Icon_Spazmatism_%28first_form%29.png" })
bosses.vanilla.push({ name: "The Destroyer", phase: "hardmode", image: "https://terraria.wiki.gg/images/6/6f/Map_Icon_The_Destroyer.png" })
bosses.vanilla.push({ name: "Skeletron Prime", phase: "hardmode", image: "https://terraria.wiki.gg/images/b/be/Map_Icon_Skeletron_Prime.png" })
bosses.vanilla.push({ name: "Plantera", phase: "hardmode", image: "https://terraria.wiki.gg/images/a/ab/Map_Icon_Plantera_%28first_form%29.png" })
bosses.vanilla.push({ name: "Golem", phase: "hardmode", image: "https://terraria.wiki.gg/images/b/b7/Map_Icon_Golem.png" })
bosses.vanilla.push({ name: "Duke Fishron", phase: "hardmode", image: "https://terraria.wiki.gg/images/e/e9/Map_Icon_Duke_Fishron.png" })
bosses.vanilla.push({ name: "Empress of Light", phase: "hardmode", image: "https://terraria.wiki.gg/images/5/5d/Map_Icon_Empress_of_Light.png" })
bosses.vanilla.push({ name: "Lunatic Cultist", phase: "hardmode", image: "https://terraria.wiki.gg/images/6/68/Map_Icon_Lunatic_Cultist.png" })
bosses.vanilla.push({ name: "Moon Lord", phase: "hardmode", image: "https://terraria.wiki.gg/images/8/82/Map_Icon_Moon_Lord.png" })
bosses.calamity.push({ name: "Cryogen", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/1/1e/Cryogen_map.png/25px-Cryogen_map.png" })
bosses.calamity.push({ name: "Aquatic Scourge", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/c/c4/Aquatic_Scourge_map.png/25px-Aquatic_Scourge_map.png" })
bosses.calamity.push({ name: "Brimstone Elemental", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/0/07/Brimstone_Elemental_map.png/25px-Brimstone_Elemental_map.png" })
bosses.calamity.push({ name: "Calamitas", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/a/a4/Calamitas_map.png/25px-Calamitas_map.png" })
bosses.calamity.push({ name: "Leviathan and Anahita", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/1/1b/Leviathan_map.png/30px-Leviathan_map.png,https://calamitymod.wiki.gg/images/thumb/3/31/Anahita_map.png/20px-Anahita_map.png" })
bosses.calamity.push({ name: "Astrum Aureus", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/9/91/Astrum_Aureus_map.png/25px-Astrum_Aureus_map.png" })
bosses.calamity.push({ name: "The Plaguebringer Goliath", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/f/f2/Plaguebringer_Goliath_map.png/20px-Plaguebringer_Goliath_map.png" })
bosses.calamity.push({ name: "Ravager", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/c/cf/Ravager_map.png/25px-Ravager_map.png" })
bosses.calamity.push({ name: "Astrum Deus", phase: "hardmode", image: "https://calamitymod.wiki.gg/images/thumb/d/d6/Astrum_Deus_map.png/25px-Astrum_Deus_map.png" })

// POST-MOONLORD
bosses.calamity.push({ name: "Profaned Guardians", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/6/6a/Guardian_Commander_map.png/10px-Guardian_Commander_map.png,https://calamitymod.wiki.gg/images/thumb/8/84/Guardian_Defender_map.png/20px-Guardian_Defender_map.png,https://calamitymod.wiki.gg/images/thumb/6/6a/Guardian_Healer_map.png/25px-Guardian_Healer_map.png" })
bosses.calamity.push({ name: "The Dragonfolly", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/7/7b/Dragonfolly_map.png/20px-Dragonfolly_map.png" })
bosses.calamity.push({ name: "Providence, the Profaned Goddess", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/f/fb/Providence_map.png/35px-Providence_map.png" })
bosses.calamity.push({ name: "Storm Weaver", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/7/72/Storm_Weaver_map.png/20px-Storm_Weaver_map.png" })
bosses.calamity.push({ name: "Ceaseless Void", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/7/70/Ceaseless_Void_map.png/30px-Ceaseless_Void_map.png" })
bosses.calamity.push({ name: "Signus, Envoy of the Devourer", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/5/52/Signus_map.png/20px-Signus_map.png" })
bosses.calamity.push({ name: "Polterghast", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/e/e6/Polterghast_map.png/25px-Polterghast_map.png" })
bosses.calamity.push({ name: "The Old Duke", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/7/7d/The_Old_Duke_map.png/25px-The_Old_Duke_map.png" })
bosses.calamity.push({ name: "The Devourer of Gods", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/f/fb/Devourer_of_Gods_map.png/25px-Devourer_of_Gods_map.png" })
bosses.calamity.push({ name: "Jungle Dragon, Yharon", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/7/70/Yharon_map.png/25px-Yharon_map.png" })
bosses.calamity.push({ name: "Exo Mechs", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/2/21/Artemis_Phase_1_map.png/25px-Artemis_Phase_1_map.png,https://calamitymod.wiki.gg/images/thumb/a/a4/Apollo_Phase_1_map.png/25px-Apollo_Phase_1_map.png,https://calamitymod.wiki.gg/images/thumb/e/e4/Thanatos_Head_map.png/25px-Thanatos_Head_map.png,https://calamitymod.wiki.gg/images/thumb/4/44/Ares_map.png/25px-Ares_map.png" })
bosses.calamity.push({ name: "Supreme Calamitas", phase: "post-moonlord", image: "https://calamitymod.wiki.gg/images/thumb/9/94/Supreme_Calamitas_map.png/25px-Supreme_Calamitas_map.png" })

// SUPER BOSSES
bosses.calamity.push({ name: "Adult Eidolon Wyrm", phase: "superboss", image: "https://calamitymod.wiki.gg/images/thumb/5/5d/Adult_Eidolon_Wyrm_map.png/25px-Adult_Eidolon_Wyrm_map.png" })

// EVENT BOSSES
bosses.vanilla.push({ name: "Dark Mage", phase: "event", image: "https://terraria.wiki.gg/images/e/e0/Map_Icon_Dark_Mage.png" })
bosses.vanilla.push({ name: "Ogre", phase: "event", image: "https://terraria.wiki.gg/images/8/88/Map_Icon_Ogre.png" })
bosses.vanilla.push({ name: "Betsy", phase: "event", image: "https://terraria.wiki.gg/images/8/84/Map_Icon_Betsy.png" })
bosses.vanilla.push({ name: "Flying Dutchman", phase: "event", image: "https://terraria.wiki.gg/images/2/21/Map_Icon_Flying_Dutchman.png" })
bosses.vanilla.push({ name: "Mourning Wood", phase: "event", image: "https://terraria.wiki.gg/images/e/ee/Map_Icon_Mourning_Wood.png" })
bosses.vanilla.push({ name: "Pumpking", phase: "event", image: "https://terraria.wiki.gg/images/0/0b/Map_Icon_Pumpking.png" })
bosses.vanilla.push({ name: "Everscream", phase: "event", image: "https://terraria.wiki.gg/images/7/7f/Map_Icon_Everscream.png" })
bosses.vanilla.push({ name: "Santa-NK1", phase: "event", image: "https://terraria.wiki.gg/images/8/87/Map_Icon_Santa-NK1.png" })
bosses.vanilla.push({ name: "Ice Queen", phase: "event", image: "https://terraria.wiki.gg/images/3/34/Map_Icon_Ice_Queen.png" })
bosses.vanilla.push({ name: "Martian Saucer", phase: "event", image: "https://terraria.wiki.gg/images/a/a0/Map_Icon_Martian_Saucer.png" })
bosses.vanilla.push({ name: "Solar Pillar", phase: "event", image: "https://terraria.wiki.gg/images/a/a3/Map_Icon_Solar_Pillar.png" })
bosses.vanilla.push({ name: "Nebula Pillar", phase: "event", image: "https://terraria.wiki.gg/images/1/1f/Map_Icon_Nebula_Pillar.png" })
bosses.vanilla.push({ name: "Vortex Pillar", phase: "event", image: "https://terraria.wiki.gg/images/6/6d/Map_Icon_Vortex_Pillar.png" })
bosses.vanilla.push({ name: "Stardust Pillar", phase: "event", image: "https://terraria.wiki.gg/images/f/fc/Map_Icon_Stardust_Pillar.png" })

bosses.vanilla.forEach(boss => { boss.type = "vanilla" })
bosses.calamity.forEach(boss => { boss.type = "calamity" })

bosses.all.push(...bosses.vanilla)
bosses.all.push(...bosses.calamity)

app.use(express.static("public"))
// app.get("/", async (req, res) => {
//     res.sendFile('client/index.html', { root: __dirname })
// })

// app.get("/reset", async (req, res) => {

//     bosses.all.forEach(async boss => {
//         const found = await Boss.create({
//             name: boss.name,
//             image: boss.image,
//             type: boss.type,
//             phase: boss.phase,
//             index: bosses.all.indexOf(boss)
//         })
//     })

//     // bosses.all.forEach(async boss => {
//     //     const found = await Boss.create({
//     //         name: boss.name,
//     //         image: boss.image,
//     //         type: bosses.vanilla.includes,
//     //         phase: boss.phase
//     //     })
//     // })

//     res.status(200)
// })

app.get(["/bosses/:type/:phase/:finished"], async (req, res) => {
    let type = req.params.type || "all"
    let phase = req.params.phase || "all"
    let finished = req.params.finished
    finished = finished === "yes" ? true : finished === "no" ? false : finished = "all"
    
    if (!bosses[type]) type = "all"

    const criteria = {
        type: type,
        phase: phase,
        finished: finished
    }

    if (type === "any" || type === "all") delete criteria.type
    if (phase === "any" || phase === "all") delete criteria.phase
    if (finished === "any" || finished === "all") delete criteria.finished

    let found = await Boss.find(criteria)

    found = found.sort((a, b) => a.index - b.index)

    res.json({ amount: found.length, bosses: found })
})
app.post("/update/:name/:finished", async (req, res) => {
    let name = req.params.name || ""
    let bool = req.params.finished || false
    bool = (bool == 'true')

    const found = await Boss.findOneAndUpdate({ name: name }, { finished: bool }, { new: true })

    if (found) {
        res.status(200).json({ success: true, data: found })
        return
    }

    res.status(400).json({ success: false, message: "Entry not found..." })
})

app.listen(PORT, async () => {
    console.log("")
    console.log("----------------------------------------")
    console.log(`Server listening @ http://localhost:${PORT}`)
    console.log("----------------------------------------")
    console.log("")
    console.log("GET /all")
    console.log("GET /vanilla")
    console.log("GET /calamity")
    console.log("")
    console.log("GET /finished")
    console.log("GET /remaining")
    console.log("")
})
