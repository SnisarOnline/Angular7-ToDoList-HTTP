export class ObjectTypes {
    // на основании етого конструктора можем создавать обьекты и сразу Определяем/Описываем тип Обьекта
    constructor(public id: number,
                public title: string,
                public completed: boolean = false,
                public body: string = '') {}
}
