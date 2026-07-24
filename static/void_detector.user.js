// ==UserScript==
// @name        Internet Roadtrip Void Detector
// @namespace   internet-roadtrip-void-detector
// @match       https://neal.fun/internet-roadtrip/*
// @version     0.0.0
// @author      lazo4
// @description Detect and avoid void panos in the Internet Roadtrip.
// @license     MIT
// @run-at      document-start
// @resource    flagCheckerboardPng data:image/png;base64,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
// @resource    flagSvg data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cgo8c3ZnCiAgIHdpZHRoPSI4MDBweCIKICAgaGVpZ2h0PSI4MDBweCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICBmaWxsPSJub25lIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICBzb2RpcG9kaTpkb2NuYW1lPSJmbGFnLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS40ICg4NmE4YWQ3LCAyMDI0LTEwLTExKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMSIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzEiCiAgICAgcGFnZWNvbG9yPSIjNTA1MDUwIgogICAgIGJvcmRlcmNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMSIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiNkMWQxZDEiCiAgICAgaW5rc2NhcGU6em9vbT0iMSIKICAgICBpbmtzY2FwZTpjeD0iMzYyIgogICAgIGlua3NjYXBlOmN5PSI0NjAuNSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjI1NjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTM2OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMSIgLz4KICA8cGF0aAogICAgIGQ9Im0gNC43LDQuMzA5OTM5MSBjIC0wLjE1MjYyMTYsMC4wNTI0MzMgLTAuMjc3NjYsMC4xNDU2NiAtMC4zNjkxNCwwLjI3MzAxIC0wLjA5MTQ4LDAuMTI3MzYgLTAuMTQwNzQsMC4yODAxOSAtMC4xNDA4NiwwLjQzNjk5IFYgMTkuOTk5ODk5IGMgMCwwLjE5OSAwLjA3OTAyLDAuMzg5NzAxIDAuMjE5NjcsMC41MzA0MDEgMC4xNDA2NSwwLjE0MDYgMC4zMzE0MiwwLjIxOTU5OSAwLjUzMDMzLDAuMjE5NTk5IDAuMTk4OTEsMCAwLjM4OTY4LC0wLjA3OSAwLjUzMDMzLC0wLjIxOTYgMC4xNDA2NSwtMC4xNDA3IDAuMjE5NjcwMiwtMC4zMzE0IDAuMjE5NjcsLTAuNTMwNCBsIC01LjNlLTYsLTUuODYwMDE3IFYgMy45OTU5OTg1IGMgMCwwIC0wLjgzNzM3MzEsMC4yNjE1MDggLTAuOTg5OTk0NywwLjMxMzk0MDYgeiIKICAgICBmaWxsPSIjMDAwMDAwIgogICAgIGlkPSJwYXRoMS0yIgogICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuODU2ODc0MTIsMCwwLDAuODU2ODc0MTIsMS43MDkwMzA4LDEuNzEzOTMwNCkiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MS4xNjcwMztzdHJva2U6bm9uZSIKICAgICBzb2RpcG9kaTpub2RldHlwZXM9InpjY3Njc2NzY2N6IgogICAgIGlua3NjYXBlOmxhYmVsPSJtYXN0IgogICAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iZmxhZy1jaGVja2VyYm9hcmQucG5nIgogICAgIGlua3NjYXBlOmV4cG9ydC14ZHBpPSI0OS4yMjAwMDEiCiAgICAgaW5rc2NhcGU6ZXhwb3J0LXlkcGk9IjQ5LjIyMDAwMSIgLz4KICA8ZwogICAgIGlkPSJnMTAiCiAgICAgaW5rc2NhcGU6bGFiZWw9ImZsYWciPgogICAgPHBhdGgKICAgICAgIGQ9Ik0gMTkuNDIsNC40NDk5NCBDIDE5LjMyMDMsNC4zODExNiAxOS4yMDUzLDQuMzM3OSAxOS4wODUsNC4zMjM5NSAxOC45NjQ3LDQuMzEgMTguODQyOCw0LjMyNTc5IDE4LjczLDQuMzY5OTQgMTcuNTkyNTcsNC44NjI4OTk4IDE1Ljg0ODI1Myw1LjMwOTExNjEgMTUuMTQ3MTIxLDUuMzY1NTU4MyBMIDE1LDUuMzY5OTQgYyAtMC44NzUxMzYsLTAuMTEyODg0NCAtMS41ODczLC0wLjU1NDI1IC0yLjMsLTEgLTAuOTE5OCwtMC41Njg1MSAtMi4yMjM5NDksLTEuMDk4OTI5MSAtMywtMS4xNiAtMC43NzYwNTEyLC0wLjA2MTA3MSAtNS4zOTc4ODUzLDAuOTgxNzE4NyAtNS42MzEzODAyLDEuMTUxOTM0NyAtMC4yMzM0OTQ4LDAuMTcwMjE2IDAuMDQ5ODc3LDkuOTYyMzkyMyAwLjA0OTg3Nyw5Ljk2MjM5MjMgMCwwIDQuMTE0NjUzNSwtMC45MTE1NjcgNS40MzE1MDM1LC0xLjAzNDM2NyAwLjg0NjcwMDcsMC4yMDc5IDEuNjU2MjAwNywwLjU0NTIgMi40MDAwMDA3LDEgMC44NzAxLDAuNTMxOSAxLjgyMzQsMC45MTM5IDMuMTYwNCwwLjkyODMgMS4zMzY5OTksMC4wMTQ0IDIuNzUyODk5LC0wLjM2NTYgNC4wOTk1OTksLTAuOTI4MyAwLjE0MDYsLTAuMDU1NyAwLjI2MTMsLTAuMTUyIDAuMzQ2OCwtMC4yNzY3IDAuMDg1NSwtMC4xMjQ3IDAuMTMxOSwtMC4yNzIxIDAuMTMzMiwtMC40MjMzIFYgNS4wNjk5NCBDIDE5LjY5NzUsNC45NTI1OCAxOS42NzY5LDQuODM1MTIgMTkuNjMsNC43MjczIDE5LjU4Myw0LjYxOTQ3IDE5LjUxMSw0LjUyNDQgMTkuNDIsNC40NDk5NCBaIgogICAgICAgZmlsbD0iIzAwMDAwMCIKICAgICAgIGlkPSJwYXRoNCIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuNzMyNzQzMDUsMCwwLDAuNzMwODM2MzUsMi45NTI0NjUzLDIuNzcwNzA2OCkiCiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjYzOTgyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjc2NjY2N6Y2NjY2Njc2NjY2MiIC8+CiAgPC9nPgo8L3N2Zz4K
// @resource    flagWithCrossSvg data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cgo8c3ZnCiAgIHdpZHRoPSI4MDBweCIKICAgaGVpZ2h0PSI4MDBweCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICBmaWxsPSJub25lIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICBzb2RpcG9kaTpkb2NuYW1lPSJmbGFnLXdpdGgtY3Jvc3Muc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjQgKDg2YThhZDcsIDIwMjQtMTAtMTEpIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxIiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MSIKICAgICBwYWdlY29sb3I9IiM1MDUwNTAiCiAgICAgYm9yZGVyY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIxIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBpbmtzY2FwZTp6b29tPSIxLjQxNDIxMzYiCiAgICAgaW5rc2NhcGU6Y3g9IjM2Mi4wMzg2NiIKICAgICBpbmtzY2FwZTpjeT0iNDY5Ljg3MjQ0IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMjU2MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMzY5IgogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmcxIiAvPgogIDxwYXRoCiAgICAgZD0ibSA0LjcsNC4zMDk5MzkxIGMgLTAuMTUyNjIxNiwwLjA1MjQzMyAtMC4yNzc2NiwwLjE0NTY2IC0wLjM2OTE0LDAuMjczMDEgLTAuMDkxNDgsMC4xMjczNiAtMC4xNDA3NCwwLjI4MDE5IC0wLjE0MDg2LDAuNDM2OTkgViAxOS45OTk4OTkgYyAwLDAuMTk5IDAuMDc5MDIsMC4zODk3MDEgMC4yMTk2NywwLjUzMDQwMSAwLjE0MDY1LDAuMTQwNiAwLjMzMTQyLDAuMjE5NTk5IDAuNTMwMzMsMC4yMTk1OTkgMC4xOTg5MSwwIDAuMzg5NjgsLTAuMDc5IDAuNTMwMzMsLTAuMjE5NiAwLjE0MDY1LC0wLjE0MDcgMC4yMTk2NzAyLC0wLjMzMTQgMC4yMTk2NywtMC41MzA0IGwgLTUuM2UtNiwtNS44NjAwMTcgViAzLjk5NTk5ODUgYyAwLDAgLTAuODM3MzczMSwwLjI2MTUwOCAtMC45ODk5OTQ3LDAuMzEzOTQwNiB6IgogICAgIGZpbGw9IiMwMDAwMDAiCiAgICAgaWQ9InBhdGgxLTIiCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC44NTY4NzQxMiwwLDAsMC44NTY4NzQxMiwxLjcwOTAzMDgsMS43MTM5MzA0KSIKICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoxLjE2NzAzO3N0cm9rZTpub25lIgogICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iemNjc2NzY3NjY3oiCiAgICAgaW5rc2NhcGU6bGFiZWw9Im1hc3QiIC8+CiAgPGcKICAgICBpZD0iZzEwIgogICAgIGlua3NjYXBlOmxhYmVsPSJmbGFnIj4KICAgIDxwYXRoCiAgICAgICBkPSJNIDE5LjQyLDQuNDQ5OTQgQyAxOS4zMjAzLDQuMzgxMTYgMTkuMjA1Myw0LjMzNzkgMTkuMDg1LDQuMzIzOTUgMTguOTY0Nyw0LjMxIDE4Ljg0MjgsNC4zMjU3OSAxOC43Myw0LjM2OTk0IDE3LjU5MjU3LDQuODYyODk5OCAxNS44NDgyNTMsNS4zMDkxMTYxIDE1LjE0NzEyMSw1LjM2NTU1ODMgTCAxNSw1LjM2OTk0IGMgLTAuODc1MTM2LC0wLjExMjg4NDQgLTEuNTg3MywtMC41NTQyNSAtMi4zLC0xIC0wLjkxOTgsLTAuNTY4NTEgLTIuMjIzOTQ5LC0xLjA5ODkyOTEgLTMsLTEuMTYgLTAuNzc2MDUxMiwtMC4wNjEwNzEgLTUuMzk3ODg1MywwLjk4MTcxODcgLTUuNjMxMzgwMiwxLjE1MTkzNDcgLTAuMjMzNDk0OCwwLjE3MDIxNiAwLjA0OTg3Nyw5Ljk2MjM5MjMgMC4wNDk4NzcsOS45NjIzOTIzIDAsMCA0LjExNDY1MzUsLTAuOTExNTY3IDUuNDMxNTAzNSwtMS4wMzQzNjcgMC44NDY3MDA3LDAuMjA3OSAxLjY1NjIwMDcsMC41NDUyIDIuNDAwMDAwNywxIDAuODcwMSwwLjUzMTkgMS44MjM0LDAuOTEzOSAzLjE2MDQsMC45MjgzIDEuMzM2OTk5LDAuMDE0NCAyLjc1Mjg5OSwtMC4zNjU2IDQuMDk5NTk5LC0wLjkyODMgMC4xNDA2LC0wLjA1NTcgMC4yNjEzLC0wLjE1MiAwLjM0NjgsLTAuMjc2NyAwLjA4NTUsLTAuMTI0NyAwLjEzMTksLTAuMjcyMSAwLjEzMzIsLTAuNDIzMyBWIDUuMDY5OTQgQyAxOS42OTc1LDQuOTUyNTggMTkuNjc2OSw0LjgzNTEyIDE5LjYzLDQuNzI3MyAxOS41ODMsNC42MTk0NyAxOS41MTEsNC41MjQ0IDE5LjQyLDQuNDQ5OTQgWiIKICAgICAgIGZpbGw9IiMwMDAwMDAiCiAgICAgICBpZD0icGF0aDQiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjczMjc0MzA1LDAsMCwwLjczMDgzNjM1LDIuOTUyNDY1MywyLjc3MDcwNjgpIgogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS42Mzk4MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY3NjY2NjemNjY2NjY3NjY2NjIiAvPgogIDwvZz4KICA8ZwogICAgIGlkPSJnOSIKICAgICBpbmtzY2FwZTpsYWJlbD0iY3Jvc3MiCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC43NjAwMDAwMSwwLDAsMC43NjAwMDAwMSwzLjA4Mjc4NTQsMTIuMjM1NTMyKSIKICAgICBzdHlsZT0ic3Ryb2tlLXdpZHRoOjEuMzE1NzkiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjUyLjYzMTY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSA0OTguNTEwMTEsMTE5LjUwMTI2IDE1MCwxNTAiCiAgICAgICBpZD0icGF0aDgiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjAzLDAsMCwwLjAzLC0wLjAyMTIxMzIsMC43NDI0NjIxMikiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjUyLjYzMTY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSA0OTguNTEwMTEsMTE5LjUwMTI2IDE1MCwxNTAiCiAgICAgICBpZD0icGF0aDkiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLDAuMDMsLTAuMDMsMCwyMy4wMTkxMjgsLTEwLjYyNzgwMykiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogIDwvZz4KPC9zdmc+Cg==
// @require     https://cdn.jsdelivr.net/npm/internet-roadtrip-framework@0.4.1-beta
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// ==/UserScript==

(function () {
    'use strict';

    // Thanks to https://github.com/Mikarific for this code
    function GM_fetch(details) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                ...details,
                onload: (response) => resolve(response),
                onerror: (err) => reject(err),
                timeout: 10000,
            });
        });
    }
    var PanoramaType;
    (function (PanoramaType) {
        PanoramaType[PanoramaType["OFFICIAL"] = 2] = "OFFICIAL";
        PanoramaType[PanoramaType["UNOFFICIAL"] = 10] = "UNOFFICIAL";
    })(PanoramaType || (PanoramaType = {}));
    function decodePanoId(panoId) {
        try {
            // Cursed Protobuf Parsing Bullshit
            // Convert potential base64 encoded protobuf panoId into a Uint8Array
            // We do it this way to avoid browser incompatibilities with Uint8Array.fromBase64
            const binary = atob(panoId.replaceAll('-', '+').replaceAll('_', '/').replaceAll('.', '='));
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            let index = 0;
            // Check if the first field (panorama type) is an integer
            // 0x08 is 00001000 in binary, so this checks if...
            // The field number, 00001 (1), is the first one.
            // The wire type, 000 (0), is that of a protobuf VARINT.
            // https://protobuf.dev/programming-guides/encoding/
            if (index >= bytes.length || bytes[index] !== 0x08)
                throw new Error('Not a protobuf panoId.');
            index++;
            const decodeVarint = () => {
                let result = 0;
                let shift = 0;
                let count = 0;
                while (index < bytes.length && count < 5) {
                    const byte = bytes[index];
                    index++;
                    result |= (byte & 0x7f) << shift;
                    if ((byte & 0x80) === 0)
                        return result;
                    shift += 7;
                    count++;
                }
                return null;
            };
            // Get the type from the panoId
            const type = decodeVarint();
            if (type === null)
                throw new Error('Not a protobuf panoId.');
            // Check if the second field (panorama id) is a string
            // 0x12 is 00010010 in binary, so this checks if...
            // The field number, 00010 (2), is the second one.
            // The wire type, 010 (2), is that of a protobuf LEN.
            // https://protobuf.dev/programming-guides/encoding/
            if (index >= bytes.length || bytes[index] !== 0x12)
                throw new Error('Not a protobuf panoId.');
            index++;
            const decodeLen = () => {
                // Get the length of the panorama id string
                const length = decodeVarint();
                if (length === null)
                    return null;
                // Check if the rest of the bytes are enough for the string
                if (index + length > bytes.length)
                    return null;
                // Decode the string
                const strBytes = bytes.slice(index, index + length);
                try {
                    return new TextDecoder().decode(strBytes);
                }
                catch {
                    // If this catches, the string is invalid UTF-8
                    return null;
                }
            };
            const id = decodeLen();
            if (id === null)
                throw new Error('Not a protobuf panoId.');
            return { type, id };
        }
        catch {
            // If this catches, the panoId is not a base64 encoded protobuf, and therefore does not include the pano type.
            // From here, we can guess the pano type from the ID.
            // Assume the panorama is official coverage unless proven otherwise.
            let type = PanoramaType.OFFICIAL;
            // If the panorama doesn't match the format of official streetview coverage, it is guaranteed to be unofficial.
            // Official panorama IDs are 22 characters long and end with a "g", "w", "A", or "Q".
            // https://reanna.neocities.org/blog/street-view-pano-ids/
            if (!/^[\w-]{21}[gwAQ]$/.test(panoId))
                type = PanoramaType.UNOFFICIAL;
            return { type, id: panoId };
        }
    }
    // TODO: Use batch metadata requests
    async function isVoid({ type, id }) {
        console.log("[Void Detector] Checking pano for void", id);
        try {
            const { status, response } = await GM_fetch({
                method: 'POST',
                headers: { 'Content-Type': 'application/json+protobuf' },
                url: 'https://maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/GetMetadata',
                // The last argument here is a list of types of data to get from the panorama ID.
                // Type 0 - ???
                // Type 1 - panorama type/id, imageWidth, imageHeight, array of cropWidth/cropHeight for each available zoom level, tileWidth, tileHeight
                // Type 2 - date the panorama was taken, month/year, multiple unknowns
                // Type 3 - copyright, and a link to an icon image of some sort?
                // Type 4 - latitude, longitude, heading, tilt, roll, a few unknowns
                // Type 5 - ???
                // Type 6 - links, each one has panorama type/id, lat/long, heading, tilt, roll, and the same unknowns as type 4
                // Type 7 - ???
                // Type 8 - ???
                // Only type 1 and type 4 are needed to be able to render a panorama image, so those are the only two I request for.
                // We only need 4 here because a void pano lacks lat and lng (exit coords)
                data: `[["apiv3"],["en","US"],[[[${type},"${id}"]]],[[1,4]]]`,
                responseType: 'json',
            });
            if (status !== 200)
                return null;
            if (response === null)
                return null;
            let meta = response;
            console.log("[Void Detector] Metadata", meta);
            if (!meta[1][0][5]) {
                // No exit coords, this is void
                return true;
            }
            else {
                // Exit coords, this is not void
                return false;
            }
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    (async function () {
        // Check if you're *really* on Internet Roadtrip
        if (!IRF?.isInternetRoadtrip) {
            return;
        }
        GM_addStyle(`
        .void-detector-void path {
            fill: #d91620 !important;
        }
    `);
        let container = await IRF.vdom.container;
        // Execute code BEFORE a vue method executes
        container.state.changeStop = new Proxy(container.methods.changeStop, {
            apply: (target, thisArg, args) => {
                let options = args[5];
                let arrows = Array.from(document.querySelectorAll(".option"));
                for (const optionArrowEl of arrows) {
                    optionArrowEl.classList.remove("void-detector-void");
                }
                // Now check all the options for voids
                for (let [idx, option] of options.entries()) {
                    let pano = decodePanoId(option.pano);
                    if (idx === 0) {
                        pano = decodePanoId("CAoSHENJQUJJaERqSWFwZDZ1YzhLZjVfRzNaWFRSeVo.");
                    }
                    isVoid(pano).then(isVoid => {
                        if (isVoid) {
                            console.log("[Void Detector] Void detected at option", idx);
                            arrows[idx].classList.add("void-detector-void");
                        }
                    });
                }
                return Reflect.apply(target, thisArg, args);
            },
        });
    })();

})();
