import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ""
if (!/image/g.test(mime)) throw '*[β] ππ΄ππΏπΎπ½π³π° πΎ π΄ππΈπππ΄ππ΄ π° ππ½π° πΈπΌπ°πΆπ΄π½*'
m.reply('*[β] π²πΎπ½ππΈπ΄πππΈπ΄π½π³πΎ πΈπΌπ°πΆπ΄π½ π° π³πΈππ΄π½ΜπΎ π°π½πΈπΌπ΄, ππ΄π° πΏπ°π²πΈπ΄π½ππ΄ π΄π½ π»πΎ πππ΄ π΄π½ππΈπΎ π΄π» ππ΄πππ»ππ°π³πΎ*')    
let data = await q.download?.()
let image = await uploadImage(data)
try {
let anime = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${image}`
await conn.sendFile(m.chat, anime, 'error.jpg', null, m)
} catch (i) {
try {
let anime2 = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${keysxxx}`
await conn.sendFile(m.chat, anime2, 'error.jpg', null, m) 
} catch (a) {    
try{    
let anime3 = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=caliphkey`
await conn.sendFile(m.chat, anime3, 'error.jpg', null, m) 
} catch (e) {
throw '*[β] π΄πππΎπ, ππ΄ππΈπ΅πΈπππ΄ πππ΄ π΄π½ π»π° πΈπΌπ°πΆπ΄π½ ππ΄π° ππΈππΈπ±π»π΄ π΄π» ππΎππππΎ π³π΄ ππ½π° πΏπ΄πππΎπ½π°*'
}}}}
handler.help = ["toanime"]
handler.tags = ["tools"]
handler.command = /^(jadianime|toanime)$/i
export default handler
