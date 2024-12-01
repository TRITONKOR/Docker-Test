declare namespace Repositories {
    interface IQuestRepository {
        getById(id: string): Promise<Entities.Quest | null>;

        getByTitle(title: string): Promise<Entities.Quest | null>;

        save(quest: Entities.Quest): Promise<Entities.Quest>;

        update(quest: Entities.Quest): Promise<Entities.Quest>;

        delete(id: string): Promise<void>;
    }
}
