exports.up = async function (knex) {
	const schema = knex.schema;
	const suggestionTableExists = await knex.schema.hasTable('Suggestion');
	const userTableExists = await knex.schema.hasTable('User');
	if (!suggestionTableExists) {
		schema.createTable('Suggestion', (table) => {
			table.increments('id').primary();
			table.integer('userId').nullable();
			table.string('title').notNullable();
			table.string('suggestion').notNullable();
			table.boolean('seen').notNullable().defaultTo(false);
			table.enum('status', ['APPROVED', 'REJECTED', 'NORMAL']).notNullable().defaultTo('NORMAL');
			table.enum('priority', ['HIGH', 'MEDIUM', 'LOW']).notNullable().defaultTo('LOW');
			table.timestamp('createdAt').nullable();
			table.timestamp('updatedAt').nullable();
			table.timestamp('deletedAt').nullable();
		});
	}
	if (!userTableExists) {
		schema.createTable('User', (table) => {
			table.increments('id').primary();
			table.string('username').notNullable().defaultTo('');
			table.string('email').notNullable().defaultTo('');
			table.string('password').notNullable().defaultTo('');
			table.string('name').notNullable().defaultTo('');
			table.enum('status', ['active', 'banned'])
				.notNullable().defaultTo('active');
			table.text('image').nullable();
			table.enum('gender', ['male', 'female', 'others']).notNullable().defaultTo('male');
			table.string('smartprixId').notNullable().defaultTo('');
			table.timestamp('createdAt').nullable();
			table.timestamp('updatedAt').nullable();
			table.timestamp('deletedAt').nullable();
		});
	}
	return schema;
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('Suggestion')
		.dropTableIfExists('User');
};
