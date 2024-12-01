declare namespace EntityFields {
    /**
     * Fields required to create or update a Hero entity.
     */
    export type Hero = {
        id?: string;
        name: string;
        superpower: string;
        teamId?: string;
    };
}

declare namespace Entities {
    /**
     * Represents a Hero entity.
     */
    export class Hero {
        public id?: string;
        public name: string;
        public superpower: string;
        public teamId?: string;

        constructor(fields: EntityFields.Hero) {
            this.id = fields.id;
            this.name = fields.name;
            this.superpower = fields.superpower;
            this.teamId = null;
        }

        /**
         * Updates the hero's superpower.
         * @param {string} newSuperpower
         */
        updateSuperpower(newSuperpower: string): void;

        setTeam(teamId: string): void;
    }
}
