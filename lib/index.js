module.exports = ({ wallets, refs, config, client }) => ({
	getCount: () => client.query("counter", { get_count: {} }),
	increment: (signer = wallets.validator) =>
		client.execute(signer, "counter", { increment: {} }),

	getGenNum: () => client.query("clicker", { get_gen_num: {} }),

	getScores: () => client.query("shooter", { get_scores: {} }),
	upsertScore: (score, signer = wallets.validator) =>
		client.execute(signer, "shooter", { upsert_score: { score } }),
});
