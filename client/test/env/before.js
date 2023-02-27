import { TextEncoder, TextDecoder } from 'util'
import fetch from 'node-fetch'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.fetch = fetch
global.Request = fetch.Request
global.Response = fetch.Response
