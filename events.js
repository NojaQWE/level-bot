const levels = require("./models/levels");
const guildss = require("./models/guild");
module.exports = async (client) => {

  client.on("messageCreate", async message => {
    if (message.author.bot || !message.guild) return;
    const { channel, levelSystem } = await guildss.findOne({ guildID: message.guild.id }) || { channel: null, levelSystem: null };
    if (!levelSystem) return;
    const { xp, gerekli, level } = await levels.findOne({ guildID: message.guild.id, userID: message.author.id }) || { xp: 0, gerekli: 100, level: 0 };
    await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$inc: { xp: xpRandom(message.content.length) } }, { upsert: true });
    const xpp = xp + xpRandom(message.content.length);
    if (xpp >= gerekli) {
      await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$set: { xp: 0 } }, { upsert: true });
      await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$set: { gerekli: gerekli + 100 }}, { upsert: true });
      await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$inc: { level: 1 }}, { upsert: true });
      if (channel) {
      client.guilds.cache.get(message.guild.id).channels.cache.get(channel).send({content:`${message.author} tebrikler! **${level + 1}.** levele ulaştın.`});
      } else {
      message.channel.send({content:`${message.author} tebrikler! **${level + 1}.** levele ulaştın.`});
      };
      onUpdateLevel(message.member, message.guild, level + 1);
    }
  })
  
}

const onUpdateLevel = async (guildMember, guild, level) => {
    const guilds = await guildss.findOne({ guildID: guild.id }) || { roles: [] };
    if(guilds.roles.length <= 0) return;
    const rolesRemove = guilds.roles.filter(data => data.level > level && guildMember.roles.cache.has(data.roleID) && guild.roles.cache.get(data.roleID));
    rolesRemove.forEach(role => {
        guildMember.roles.remove(role.roleID);
    });
    const rolesAdd = guilds.roles.filter(data => data.level <= level && !guildMember.roles.cache.has(data.roleID) && guild.roles.cache.get(data.roleID));
    rolesAdd.forEach(role =>{
        guildMember.roles.add(role.roleID);
    });
}

const xpRandom = (length) => {
  return Number(Math.floor(Number(length) * 5 / 3));
}