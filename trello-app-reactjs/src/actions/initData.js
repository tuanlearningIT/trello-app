export const initData = {

    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-3', 'column-2',],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'boad-1',
                    title: 'To do 1',
                    cardOrder: ['card-1', 'card-2'],
                    cards: [
                        {
                            id: 'card-1', boardId: 'boad-1', columnId: 'column-1', title: 'tille 1', cover: 'https://bit.ly/trello-app-1'
                        },
                        {
                            id: 'card-2', boardId: 'boad-1', columnId: 'column-1', title: 'tille 2', cover: null
                        },
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'boad-1',
                    title: 'To do 2',
                    cardOrder: ['card-3', 'card-4'],
                    cards: [
                        {
                            id: 'card-3', boardId: 'boad-1', columnId: 'column-1', title: 'tille 3', cover: null
                        },
                        {
                            id: 'card-4', boardId: 'boad-1', columnId: 'column-1', title: 'tille 4', cover: null
                        },
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'boad-1',
                    title: 'To do 3',
                    cardOrder: ['card-5', 'card-6'],
                    cards: [
                        {
                            id: 'card-5', boardId: 'boad-1', columnId: 'column-1', title: 'tille 5', cover: 'https://bit.ly/trello-app-1'
                        },
                        {
                            id: 'card-6', boardId: 'boad-1', columnId: 'column-1', title: 'tille 6', cover: null
                        },
                    ]
                },


            ]
        }
    ]
}