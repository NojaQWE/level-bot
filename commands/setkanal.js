const {MessageEmbed,Permissions} = require('discord.js');
const guilds = require("../models/guild")
exports.run = async (client, message, args) => {
let prefix = process.env.PREFIX;
  if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({content: 'Bu komutu kullanmak için yeterli yetkiniz yok'})

  
  if(args[0] == 'ayarla'){
    
     let kanal = message.mentions.channels.first();
  if(!kanal) return message.channel.send({content: 'Kanal belirtiniz'})
    
    const data = await guilds.findOne({ guildID: message.guild.id }) || { channel: null };
if (data.channel) return message.channel.send({content: 'Kanal zaten ayarlanmış, yeni kanal ayarlamak için önce sıfırlayın'});
    
 await guilds.updateOne({ guildID: message.guild.id }, {$set: { channel: kanal.id } }, { upsert: true })
  const levelEmbed = new MessageEmbed()
  .setTitle(`LeveL Kanalı Ayarlandı`)
  .setDescription(`Artık Kullanıcılar level atlayınca ${kanal} isimli kanala bildirim gicek`)
  .setFooter(`${message.author.tag} tafından istendi`, message.author.avatarURL({dynamic: true, size:1024}))
  message.channel.send({embeds: [levelEmbed]})
  }
  
  if(args[0] == 'sıfırla'){
    const data = await guilds.findOne({ guildID: message.guild.id }) || { channel: null };
if (!data.channel) return message.channel.send({content: 'Kanal zaten ayarlanmamış, önce yeni kanal ayarlayın'});;
 await guilds.updateOne({ guildID: message.guild.id }, {$unset: { channel: 1 } }, { upsert: true })
  const revEmbed = new MessageEmbed()
  .setTitle(`LeveL Kanalı Sıfırlandı`)
  .setDescription(`Artık Kullanıcılar level atlayınca kanala bildirim gitmeyecek`)
  .setFooter(`${message.author.tag} tafından istendi`, message.author.avatarURL({dynamic: true, size:1024}))
  message.channel.send({embeds: [revEmbed]})
  }
  
  if(!args[0]){
 // await guilds.updateOne({ guildID: message.guild.id }, {$pull: { roles: { roleID: role.id, level: Number(args[1]) } } }, { upsert: true })
  const levelEmbed = new MessageEmbed()
  .setDescription(`Bir Argüman belirtiniz. Doğru kullanım: \`${prefix}setkanal ayarla/sıfırla\``)
  .setFooter(`${message.author.tag} tafından istendi`, message.author.avatarURL({dynamic: true, size:1024}))
  message.channel.send({embeds: [levelEmbed]})
  }
};

exports.name = "setkanal";