declare namespace EntityFields {
    /**
     * Fields required to create or update a Quest entity.
     */
    export type Quest = {
        id?: string;
        title: string;
        description: string;
        status?: "pending" | "in-progress" | "completed";
        assignedTeam?: string | null;
    };
}

declare namespace Entities {
    /**
     * Represents a Quest entity.
     */
    export class Quest {
        public id?: string;
        public title: string;
        public description: string;
        public status: "pending" | "in-progress" | "completed";
        public assignedTeam?: string | null;

        constructor(fields: EntityFields.Quest) {
            this.id = fields.id;
            this.title = fields.title;
            this.description = fields.description;
            this.status = fields.status ?? "pending";
            this.assignedTeam = fields.assignedTeam ?? null;
        }

        /**
         * Assigns a team to the quest.
         * @param {string} teamId
         * @throws {Error} If the quest is already assigned to a team.
         */
        assignTeam(teamId: string): void;

        /**
         * Marks the quest as completed.
         * @throws {Error} If the quest is not assigned to a team.
         */
        complete(): void;
    }
}
