import { } from 'jasmine';
import * as assert from 'assert';
import { expect } from 'chai';
import { } from 'mocha';
import { mongoUnitStart, mongoUnitStop} from '../src/mongoUnit'
import { instanceExternalService} from '../src/externalServiceUnit'
import { instanceInternalService} from '../src/internalServiceUnit'

describe(`Проверка тестов`, function () {
    instanceExternalService
    instanceInternalService
    after(function () {
        instanceExternalService.close();
        instanceExternalService.close();
        mongoUnitStop().subscribe(()=>{
            process.exit();//только так удалось стопнуть тест
        });

    });
    this.timeout(30000);
    it('Должен запуститься', (done) => {
        mongoUnitStart().filter((done) => done).take(1).subscribe((flag)=>{
            done()
        });
    });

});