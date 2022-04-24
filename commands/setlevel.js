const {MessageEmbed,Permissions} = require('discord.js');
const guilds = require("../models/guild");
exports.run = async (client, message, args) => {

if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({content: 'Bu komutu kullanmak için yeterli yetkiniz yok'})
 
  let role = message.mentions.roles.first();
  if(!role) return message.channel.send({content: 'Rol belirtiniz'})
  if(!args[1]) return message.channel.send({content: 'Level belirtiniz'})
  await guilds.updateOne({ guildID: message.guild.id }, {$push: { roles: { roleID: role.id, level: Number(args[1]) } } }, { upsert: true })
  const levelEmbed = new MessageEmbed()
  .setTitle(`Rol Ayarlandı`)
  .setDescription(`Artık Kullanıcılar **${args[1]}** leveline ulaşınca **${role}** rolüne sahip olucaklar`)
  .setFooter(`${message.author.tag} tafından istendi`, message.author.avatarURL({dynamic: true, size:1024}))
  message.channel.send({embeds: [levelEmbed]})
};

exports.name = "setLevel";