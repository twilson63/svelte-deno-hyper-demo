import "https://deno.land/x/dotenv@v3.1.0/load.ts"
import { connect } from 'hyper-connect'

const hyper = connect(Deno.env.get('HYPER') as string)

const result = await hyper.data.index('idx-id', ['_id'])
console.log(result)