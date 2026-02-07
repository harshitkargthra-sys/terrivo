import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { GenerateAIAction } from './actions/GenerateAIAction'

export default defineConfig({
    name: 'default',
    title: 'Terrivo Admin',
    projectId: 'zvazmyez',
    dataset: 'production',
    plugins: [structureTool()],
    schema: {
        types: schemaTypes,
    },
    document: {
        actions: (prev, context) => {
            if (context.schemaType === 'post') {
                return [GenerateAIAction, ...prev]
            }
            return prev
        },
    },
})
