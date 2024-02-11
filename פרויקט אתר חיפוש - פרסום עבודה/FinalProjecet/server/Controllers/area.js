import https from 'https';
import fs from 'fs';
import path from 'path';

import { areaModel } from '../../module/mongoSchemas.js'

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת כל האזורים

async function GetAreas(req, res) {

    let data = await areaModel.find({});
    res.send(JSON.stringify(data));

}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export { GetAreas };
