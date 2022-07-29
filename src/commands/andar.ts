import { ICommand } from 'wokcommands'
import DiaryLevels from '../diaryLevels.json'
import { updateDiary } from '../usecases/user/updateDiary'

const cargos = {
    level0: '997669428676268133',
    level27: '998244480601825331',
}

export default {
    category: 'Looting',
    description: 'Sair para descobrir os arredores!',
    // slash: true,
    callback: async ({ member, message, interaction, args }) => {
        if (!Object.values(cargos).some(cargo => member.roles.cache.has(cargo))) {
            return 'Você não tem permissão para usar esse comando'
        }

        for (const [level, folhas] of Object.entries(DiaryLevels.level)) {
            const [num1, num2, num3] = folhas
            const page = await updateDiary({ userId: interaction.user.id, num1, num2, num3 })

            if (page) {
                return `${interaction.user} achou uma página de um diário, digite /diario para ver`
            }
            return `${interaction.user} andou, mas não encontrou nada`
        }
    },
} as ICommand
