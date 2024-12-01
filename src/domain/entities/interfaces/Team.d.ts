declare namespace EntityFields {
    /**
     * Fields required to create or update a Team entity.
     */
    export type Team = {
        id?: string;
        title: string;
        description: string;
        members: Array<string>;
        quests: Array<string>;
    };
}

declare namespace Entities {
    /**
     * Represents a Team entity.
     */
    export class Team {
        public id?: string;
        public title: string;
        public description: string;
        public members: string[];
        public quests: string[];

        constructor(fields: EntityFields.Team) {
            this.id = fields.id;
            this.title = fields.title;
            this.description = fields.description;
            this.members = [];
            this.quests = [];
        }

        /**
         * Adds a hero to the team.
         * @param {string} heroId
         */
        addHero(heroId);

        /**
         * Removes a hero from the team by ID.
         * @param {string} heroId
         */
        removeHero(heroId);

        /**
         * Assigns a quest to the team.
         * @param {string } questsId
         */
        addQuest(questId);

        /**
         * Marks a quest as completed and removes it from the active list.
         * @param {string} questId
         */
        completeQuest(questId);
    }
}
