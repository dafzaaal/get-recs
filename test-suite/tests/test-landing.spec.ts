import { test, expect, request } from "@playwright/test"

test('Test Landing Page', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.getByRole('button', { name: "Start Learning..." })).toBeVisible();
    await expect(page.getByPlaceholder('Type away...')).toBeVisible();
})

test.describe('Tests Related to Empty Prompts', () => {

    test('Correct navigation on click event', async({ page }) => {
        await page.goto('http://localhost:5173');
        await page.getByRole('button', { name: 'Start learning...' }).click()
        await expect(page.url()).toContain('/learning')
        
    })

    test('Ensure no API Call is Made when users enter an empty prompt', async ({ page }) => {

        await page.goto('http://localhost:5173/');
        await page.getByRole('button', {name: 'Start learning...'}).click();

        let APICalled = false;
        page.on('request', request => {
            if (request.url().includes('localhost')) {
                APICalled = true;
            }
        });
        await page.waitForLoadState('networkidle');
        expect(APICalled).toBe(false);
    })
})


test.describe('API Calls Made Successfully Given a non-empty Prompt', () => {
    test('Gemini & YouTube API Called on non-empty Prompt', async ({ page }) => {

        let youTubeAPICalled = false;
        let geminiAPICalled = false; 
        let postRequests: Array<string> = [];

        await page.goto('http://localhost:5173/');
        await page.getByPlaceholder('Type away...').fill('React TS Tutorial');

        page.on('request', request => {
            if(request.method() == "POST") {
                postRequests.push(request.url())
            }
        });

        await page.getByRole('button', { name: 'Start learning...' }).click();

        
        await page.waitForLoadState('networkidle');

        postRequests.forEach((request: string) => {
            if(request.includes('/youtube')) {
                youTubeAPICalled = true;
            }
            else if (request.includes('/gemini')) {
                geminiAPICalled = true;
            }
        });

        expect(youTubeAPICalled).toBe(true);
        expect(geminiAPICalled).toBe(true);

    });

    test('Verify JSON Data against Schema', async ({ page }) => {
        type GeminiAPIData = {
            response: string
        }
        type YouTubeAPIData = {
            title: string,
            desc: string, 
            videoId: string, 
            thumbnail: string,
            channelName: string,
        }
        await page.goto('http://localhost:5173');
        await page.getByPlaceholder('Type away...').fill('How to scale an API?');
        page.on('request', request => {
            if(request.url().includes('/youtube')) {
                const response = request;
                console.log(response);
                
            };
        })
    });
})
