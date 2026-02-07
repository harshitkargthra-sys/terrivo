import { useState, useCallback } from 'react'
import { useDocumentOperation, DocumentActionProps } from 'sanity'
import { Sparkles, Lightbulb } from 'lucide-react'
import { Button, Dialog, Stack, TextArea, Text, Box, useToast, Flex } from '@sanity/ui'

export function GenerateAIAction(props: DocumentActionProps) {
    const { patch } = useDocumentOperation(props.id, props.type)
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const onGenerate = useCallback(async () => {
        if (!prompt) return;
        setLoading(true)
        try {
            // Determine the URL for the Netlify function
            // If on localhost:3333 (Sanity), try to hit localhost:8888 (Netlify)
            const functionUrl = window.location.hostname === 'localhost'
                ? 'http://localhost:8888/.netlify/functions/generatePost'
                : '/.netlify/functions/generatePost';

            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            })

            if (!response.ok) {
                throw new Error('Could not connect to the AI service. Make sure Netlify CLI is running.')
            }

            const data = await response.json()
            if (data.error) throw new Error(data.error)

            // Parse Markdown to Portable Text Blocks
            const lines = data.bodyMarkdown.split('\n')
            const blocks: any[] = []

            lines.forEach((line: string) => {
                const trimmed = line.trim()
                if (!trimmed) return

                let style = 'normal'
                let text = trimmed

                if (trimmed.startsWith('### ')) {
                    style = 'h3'
                    text = trimmed.replace('### ', '')
                } else if (trimmed.startsWith('## ')) {
                    style = 'h2'
                    text = trimmed.replace('## ', '')
                } else if (trimmed.startsWith('# ')) {
                    style = 'h1'
                    text = trimmed.replace('# ', '')
                }

                blocks.push({
                    _type: 'block',
                    _key: Math.random().toString(36).substring(2, 9),
                    style: style,
                    children: [{
                        _type: 'span',
                        _key: Math.random().toString(36).substring(2, 9),
                        text: text
                    }],
                    markDefs: []
                })
            })

            patch.execute([
                { set: { title: data.title } },
                { set: { excerpt: data.excerpt } },
                { set: { body: blocks } },
                {
                    set: {
                        slug: {
                            _type: 'slug',
                            current: data.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
                        }
                    }
                }
            ])

            toast.push({
                status: 'success',
                title: 'AI Content Generated!',
                description: 'The fields have been filled with content from Gemini.'
            })
            setDialogOpen(false)
        } catch (err: any) {
            console.error(err)
            toast.push({
                status: 'error',
                title: 'Generation Failed',
                description: err.message
            })
        } finally {
            setLoading(false)
        }
    }, [prompt, patch, toast])

    return {
        label: 'Generate with Gemini',
        icon: Sparkles,
        onHandle: () => setDialogOpen(true),
        dialog: isDialogOpen && {
            type: 'dialog' as const,
            onClose: () => setDialogOpen(false),
            header: 'Generate Blog Post',
            content: (
                <Box padding={4}>
                    <Stack space={4}>
                        <Box>
                            <Text size={1} weight="semibold">Topic or Keywords</Text>
                            <Box marginTop={2}>
                                <TextArea
                                    value={prompt}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.currentTarget.value)}
                                    placeholder="e.g. Why sustainable packaging matters for electronics brands"
                                    rows={4}
                                />
                            </Box>
                        </Box>

                        <Flex gap={2}>
                            <Button
                                fontSize={2}
                                padding={3}
                                text={loading ? 'Generating...' : 'Start Generating'}
                                tone="primary"
                                onClick={onGenerate}
                                disabled={loading || !prompt}
                                style={{ flex: 1 }}
                            />
                        </Flex>

                        {!prompt && (
                            <Box marginTop={2}>
                                <Text size={1} muted>
                                    <Lightbulb size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                                    Tip: Mention specific products or values like "luxury" or "affordable".
                                </Text>
                            </Box>
                        )}
                    </Stack>
                </Box>
            )
        }
    }
}
