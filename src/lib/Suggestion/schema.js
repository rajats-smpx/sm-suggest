const Suggestion = {
	graphql: 'type',
	schema: ['admin'],
	relayConnection: true,
	fields: {
		id: 'ID',
		userId: 'ID',
		title: 'String',
		suggestion: 'String',
		seen: 'Boolean',
		status: 'String',
		priority: 'String',
		createdAt: 'String',
		user: 'User',
	},
};

const getSuggestion = {
	graphql: 'query',
	schema: ['admin'],
	type: 'Suggestion',
	name: 'suggestion',
	args: {
		$default: [
			'id',
		],
	}
};

const getSuggestions = {
	graphql: 'query',
	schema: ['admin'],
	type: 'SuggestionConnection',
	name: 'suggestions',
	args: {
		$default: [
			'id',
			'userId',
			'seen',
			'status',
		],
	}
};

const saveSuggestion = {
	graphql: 'mutation',
	schema: ['admin'],
	type: 'Suggestion',
	args: {
		$default: [
			'id',
			'userId',
			'title',
			'suggestion',
			'seen',
			'status',
			'priority',
		],
	},
};

const deleteSuggestion = {
	graphql: 'mutation',
	schema: ['admin'],
	type: 'DeletedItem',
	args: {
		id: 'ID!',
	},
};

export default {
	Suggestion,
	getSuggestion,
	getSuggestions,
	saveSuggestion,
	deleteSuggestion,
};