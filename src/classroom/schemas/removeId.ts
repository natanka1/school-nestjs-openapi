export function removeIdPlugin(schema, options) {
    schema.post(['find', 'findOne', 'save'], function(docs) {
        if (!Array.isArray(docs)) {
        docs = [docs];
        }
        for (const doc of docs) {
        delete(doc._id)
        delete(doc.__v)
        }
    });
};