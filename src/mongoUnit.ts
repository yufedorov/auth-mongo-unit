import * as mongoUnit from 'mongo-unit'
const mongoose = require('mongoose')
import {BehaviorSubject, Observable} from 'rxjs/Rx';
const Schema = mongoose.Schema

function dao(url) {
    mongoose.connect(url)

    const settingsSchema = new Schema({
        _id: String,
        name:  String,
        access: String,
        address:{
            hostname:String,
            port:String
        }
    })
    const userSessionSchema = new Schema({
        _id: String,
        username:  String,
        sessions: [
            {
                token:String,
                expireDate:Date,
                service:String,
                username:String,
                domain:String
            }
        ]
    })

    const userProfileSchema = new Schema({
        _id: String,
        userName:  String,
        displayName: {
            ru : String
        },
        rootAssetCode:String,
        currentRoute : String,
        eTag : Number,
        id : String,
        objectType : String,
        username : String,
        version : Number

    })

    return {
        settings:  mongoose.model('settings', settingsSchema),
        user_sessions:  mongoose.model('user_sessions', userSessionSchema),
        user_profiles:  mongoose.model('user_profiles', userProfileSchema)
    }
}

const data={
    "settings": [
        {
            "_id": "56d9bf92f9be48771d6fe5b1",
            "name": "INTERNAL_SERVICE",
            "access": "public",
            "address":{
                "hostname":"localhost",
                "port":"3020"
            }
        },
        {
            "_id": "43d9bf92f9be48771d6fe5b1",
            "name": "TEST_EXTERNAL_SERVICE",
            "access": "public",
            "address":{
                "hostname":"localhost",
                "port":"3023"
            }
        }
    ],
    "user_sessions":[{}],
    "user_profiles":[
        {
            "_id" : "762tdD9EPpZKXo4fc",
            "userName" : "mganl1",
            "displayName" : {
                "ru" : "Иванов Иван Иванович"
            },
            "rootAssetCode" : "{ЕЦГ.ВЦЗ}",
            "currentRoute" : null,
            "eTag" : 12,
            "id" : "762tdD9EPpZKXo4fc",
            "objectType" : "userprofile",
            "username" : "mganl1",
            "version" : 1
        },
        {
            "_id" : "762tdD9EPpZKXo4fa",
            "userName" : "mganl2",
            "displayName" : {
                "ru" : "Иванов Иван Иванович2"
            },
            "rootAssetCode" : "{ЕЦГ.ВЦЗ}",
            "currentRoute" : null,
            "eTag" : 12,
            "id" : "762tdD9EPpZKXo4fa",
            "objectType" : "userprofile",
            "username" : "mganl2",
            "version" : 1
        },
        {
            "_id" : "345tdD9EPpZKXo4fc",
            "userName" : "test_ext_user",
            "displayName" : {
                "ru" : "Тестов Внешний Сервисович"
            },
            "rootAssetCode" : "{ЕЦГ.ВЦЗ}",
            "currentRoute" : null,
            "eTag" : 12,
            "id" : "345tdD9EPpZKXo4fc",
            "objectType" : "userprofile",
            "username" : "test_ext_user",
            "version" : 1
        },
        {
            "_id" : "64tdD9EPpZKXo4er",
            "userName" : "int_user",
            "displayName" : {
                "ru" : "Тестов Внутренний Сервисович"
            },
            "rootAssetCode" : "{ЕЦГ.ВЦЗ}",
            "currentRoute" : null,
            "eTag" : 12,
            "id" : "64tdD9EPpZKXo4er",
            "objectType" : "userprofile",
            "username" : "int_user",
            "version" : 1
        }
    ]
}
let daoUT;
let initDone$: BehaviorSubject<boolean> = new BehaviorSubject(false)
export function mongoUnitStart()
{
    console.log('MONGO_UNIT: mongoUnitStart');
    let promise = mongoUnit.start()
        .then(url => {
            console.log('MONGO_UNIT: url = ' + url);
            daoUT = dao(url);
        })
        .then(() => {
            mongoUnit.load(data);
        })
        .then(() => {
            daoUT.settings.find()
                .then(settings => {
                    settings.forEach((el) => {
                        console.log('MONGO_UNIT: initDone$:'+el.name);
                        initDone$.next(true);
                    })
                })
        }).catch((err)=>{
            console.log(err.code);
            initDone$.next(true);})
    return initDone$;
}

export let mongoUnitStop=():Observable<boolean>=>
{
    return Observable.create((observer)=> {
        //this.mongoose.disconnect();
        mongoUnit.drop().catch(((e) => {
            console.log(e)
        })).then(() => {
            //observer.next(true)

            mongoUnit.stop().then(() => {
                observer.next(true);
                console.log('Server stopped');
            })

        })
    })
}
/*initDone$.filter((done) => done).take(1).subscribe(()=>{
    console.log('InitDone');
    mongoUnit.drop().then(()=>{
        console.log('BD dropped');
        mongoUnit.stop().then(()=>{
            console.log('Server stopped');
        })
    })
})*/