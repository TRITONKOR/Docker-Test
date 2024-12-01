declare namespace Repositories {
    interface IHeroRepository {
        getById(id: string): Promise<Entities.Hero | null>;

        save(hero: Entities.Hero): Promise<Entities.Hero>;

        update(hero: Entities.Hero): Promise<Entities.Hero>;

        delete(id: string): Promise<void>;
    }
}
