import ytdl from "ytdl-core";
import fs from "fs";

let handler = async (m, { conn, args, isPrems, isOwner }) => {
  const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
  };
  if (args.length === 0) {
    m.reply(`*[β] πΈπ½ππ΄πππ΄ π΄π» π²πΎπΌπ°π½π³πΎ πΌπ°π π΄π» π΄π½π»π°π²π΄ / π»πΈπ½πΊ π³π΄ ππ½ ππΈπ³π΄πΎ π³π΄ ππΎππππ±π΄*`);
    return;
  }
  try {
    let urlYt = args[0];
    if (!urlYt.startsWith("http")) {
      m.reply(`*[β] πΈπ½πΆππ΄ππ΄ ππ½ π΄π½π»π°π²π΄ π²πΎπππ΄π²ππΎ π³π΄ ππΎππππ±π΄*`);
      return;
    }
    let infoYt = await ytdl.getInfo(urlYt);
    let titleYt = infoYt.videoDetails.title;
    let randomName = getRandom(".mp4");
    const stream = ytdl(urlYt, { filter: (info) => info.itag == 22 || info.itag == 18, }).pipe(fs.createWriteStream(`./tmp/${randomName}`));
    m.reply(global.wait);
    //console.log("Descargando ->", urlYt);
    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });
    let stats = fs.statSync(`./tmp/${randomName}`);
    let fileSizeInBytes = stats.size;
    let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    //console.log("TamaΓ±o del video: " + fileSizeInMegabytes);
    if (fileSizeInMegabytes <= 999) {
      conn.sendMessage( m.chat, { document: fs.readFileSync(`./tmp/${randomName}`), fileName: `${titleYt}.mp4`, mimetype: "video/mp4", }, { quoted: m });
    } else {
      m.reply(`*[β] π΄π» π°ππ²π·πΈππΎ π΄π πππΏπ΄ππΈπΎπ π° πΏπΏπΏ πΌπ±*`);
    }
    fs.unlinkSync(`./tmp/${randomName}`);
  } catch (e) {
    m.reply(e.toString());
  }
};
handler.help = ["ytd"];
handler.tags = ["downloader"];
handler.command = ["videodoc", "documentvid", "videodocumento"];
handler.exp = 3;
export default handler;
