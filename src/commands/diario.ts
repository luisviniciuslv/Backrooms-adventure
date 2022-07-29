    import { MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { ICommand } from 'wokcommands'
import DiaryLevels from '../diaryLevels.json'
import Papers from '../papers.json'
import { getUser } from '../usecases/user/getUser'

const cargos = {
    level0: '997669428676268133',
    level27: '998244480601825331',
}

export default {
    category: 'Inventário',
    description: 'Olhar páginas do diário coletadas',
    // slash: true,
    expectedArgs: '<backroom>',
    minArgs: 0,
    maxArgs: 1,
    callback: async ({ member, interaction: msgInt, channel, args }) => {
        if (!args.length) {
            return 'Comando escrito de forma incorreta, para usar o comando corretamente, digite /diario <backroom>'
        }

        if (!Object.values(cargos).some(cargo => member.roles.cache.has(cargo))) {
            return 'Você não tem permissão para usar esse comando'
        }

        const levelIsNumber = /^\d+$/.test(args[0])

        if (!levelIsNumber) {
            return 'O nível deve ser um número'
        }

        const allLevels = Object.keys(DiaryLevels.level)

        if (!allLevels.includes(args[0])) {
            return 'Essa backroom ainda não foi implementada'
        }

        const diary = await getUser(member.user.id, 'diary')

        const folhas = (DiaryLevels as any).level[args[0]] as number[]

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('Backroom 0')
                .setPlaceholder('Diário')
                .addOptions(
                    folhas.map(folha => ({
                        label: diary.includes(folha) ? `Folha ${folha}` : '???',
                        description: `Enviar ao chat`,
                        value: folha.toString(),
                    }))
                )
        )

        await msgInt.reply({
            content: 'Diário',
            components: [row],
        })

        const collector = channel.createMessageComponentCollector({
            max: 14,
            time: 1000 * 15,
        })
        collector.on('collect', async (i: SelectMenuInteraction) => {
            const folha = parseInt(i.values[0])
            i.deferUpdate()

            if (i.user.id === msgInt.user.id) {
                const diary = await getUser(msgInt.user.id, 'diary')

                if (diary.includes(folha)) {
                    i.channel!.send({
                        content: `${folha} enviado ao chat do ${msgInt.user}\nCaso não receba a mensagem, entre em contato com um adm`,
                        components: [],
                    })
                    msgInt.user.send(Papers.papers[folha]).catch(console.error)
                } else {
                    i.channel!.send({
                        content: 'Você não tem esse item',
                    })
                }
            }
        })
    },
} as ICommand
