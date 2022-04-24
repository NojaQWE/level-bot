const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
  
  let prefix = process.env.PREFIX;
  const embed = new MessageEmbed()
  .setTitle('Gweep Creative Level Bot Yardım Menüsü')
  //.setDescription(`Aşağıdaki komutları kullanarak botu yönetebilirsiniz.`)
  .addField(`> ${prefix}level-sistem aç/kapat`,`Level sistemini açar/kapatır`,false)
  .addField(`> ${prefix}leaderboard`,`Top10 Listeyi gösterir.`,false)
  .addField(`> ${prefix}level`,`belirtilen kullanıcının level bilgisini gösterir`,false)
  .addField(`> ${prefix}setLevel <level> <@Role>`,`belirtilen levele ulaşanlara belirtilen rolü verir.`,false)
  .addField(`> ${prefix}delLevel <level> <@Role>`,`ayarlanmış level ile rol vermeyi kaldırır.`,false)
  .addField(`> ${prefix}setKanal <#kanal>`,`belirtilen kanala level atlama mesajları gider.`,false)
  .setThumbnail(client.user.avatarURL())
  .setFooter(`${message.author.tag} tarafından isteindi — Developed by Gweep Creative`, message.author.avatarURL())
  .setColor('BLUE')
  message.channel.send({embeds: [embed]})

};

exports.name = "yardım";
