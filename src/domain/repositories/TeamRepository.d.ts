declare namespace Repositories {
    interface ITeamRepository {
        getById(id: string): Promise<Entities.Team | null>;

        getByTitle(title: string): Promise<Entities.Team | null>;

        save(team: Entities.Team): Promise<Entities.Team>;

        update(team: Entities.Team): Promise<Entities.Team>;

        delete(id: string): Promise<void>;
    }
}
