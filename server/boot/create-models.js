"use strict";
module.exports = function (app) {
  app.dataSources.postgres.automigrate(["Master", "Detail", "Operation", "Repair", "Batch", "OperationDetail"], (err) => {
    if (err) {
      throw err;
    }

    app.models.Master.create([
      {surname: "Бабийчук", name: "Антон", patronymic: "Семёнович", birthDate: "1995-04-08"},
      {surname: "Мамчур", name: "Иван", patronymic: "Александрович", birthDate: "1995-03-14"},
      {surname: "Селезнёв", name: "Игорь", patronymic: "Юриевич", birthDate: "1994-12-08"},
      {surname: "Скубак", name: "Никита", patronymic: "Вадимович", birthDate: "1994-12-17"},
      {surname: "Слесаренко", name: "Олег", patronymic: "Дмитриевич", birthDate: "1995-08-15"},
      {surname: "Денисенко", name: "Егор", patronymic: "Алексеевич", birthDate: "1995-02-05"},
      {surname: "Шилин", name: "Леонид", patronymic: "Олегович", birthDate: "1994-06-15"},
      {surname: "Лящук", name: "Максим", patronymic: "Романович", birthDate: "1994-03-04"},
      {surname: "Довгун", name: "Артём", patronymic: "Анатолиевич", birthDate: "1995-01-03"},
      {surname: "Викедсик", name: "Сергей", patronymic: "Александрович", birthDate: "1994-08-08"}
    ], (err, masters) => {
      if (err) {
        throw err;
      }
      console.log('Models created: \n', masters);
    });

    app.models.Detail.create([
      {title: "Левая передняя фара", quantity: "5"},
      {title: "Правая передняя фара", quantity: "7"},
      {title: "Левая задняя фара", quantity: "6"},
      {title: "Правая задняя фара", quantity: "1"},
      {title: "Левое зеркало заднего вида", quantity: "0"},
      {title: "Правое зеркало заднего вида", quantity: "9"},
      {title: "Левая передняя стойка", quantity: "15"},
      {title: "Правая передняя стойка", quantity: "48"},
      {title: "Передний стабилизатор поперечной устойчивости", quantity: "5"},
      {title: "Сцепление в сборе", quantity: "58"}
    ], (err, details) => {
      if (err) {
        throw err;
      }
      console.log('Models created: \n', details);
    });

    app.models.Batch.create([
      {date: "2016-03-03", quantity: "7", detailId: "2"},
      {date: "2016-03-03", quantity: "6", detailId: "3"},
      {date: "2016-03-03", quantity: "1", detailId: "4"},
      {date: "2016-03-03", quantity: "3", detailId: "5"},
      {date: "2016-03-08", quantity: "9", detailId: "6"},
      {date: "2016-03-08", quantity: "15", detailId: "8"},
      {date: "2016-03-10", quantity: "48", detailId: "9"},
      {date: "2016-03-15", quantity: "5", detailId: "9"},
      {date: "2016-03-15", quantity: "58", detailId: "10"},
      {date: "2016-03-15", quantity: "9", detailId: "1"}
    ], (err, batches) => {
      if (err) {
        throw err;
      }
      console.log('Models created: \n', batches);
    });

    const multiplier = 60 * 1000;

    app.models.Operation.create([
      //Длительность в мтллтсекундах в базе, но при возвращении на клиенте преобразовывается в минуты, приходят также минуты
      {title: "Замена сцепления", price: "650", duration: `${540 * multiplier}`},
      {title: "Замена левой передней фары", price: "120", duration: `${40 * multiplier}`},
      {title: "Замена правой передней фары", price: "120", duration: `${40 * multiplier}`},
      {title: "Замена задних фар", price: "300", duration: `${100 * multiplier}`},
      {title: "Замена правой передней стойки", price: "150", duration: `${60 * multiplier}`},
      {title: "Замена левой передней стойки", price: "150", duration: `${60 * multiplier}`},
      {title: "Замена переднего стабилизатора поперечной устойчивости", price: "330", duration: `${320 * multiplier}`},
      {title: "Замена зеркал заднего вида", price: "60", duration: `${20 * multiplier}`}
    ], (err, operations) => {
      if (err) {
        throw err;
      }
      console.log('Models created: \n', operations);
    });

    app.models.OperationDetail.create([
      {operationId: 1, detailId: 10, quantity: 1},
      {operationId: 2, detailId: 1, quantity: 1},
      {operationId: 3, detailId: 2, quantity: 1},
      {operationId: 4, detailId: 3, quantity: 1},
      {operationId: 4, detailId: 4, quantity: 1},
      {operationId: 5, detailId: 8, quantity: 1},
      {operationId: 6, detailId: 7, quantity: 1},
      {operationId: 7, detailId: 9, quantity: 1},
      {operationId: 8, detailId: 4, quantity: 1},
      {operationId: 8, detailId: 3, quantity: 1}
    ], (err, operationsDetails) => {
      if (err) {
        throw err;
      }
      console.log('Models created: \n', operationsDetails);
    });

    app.models.Repair.create([
      {
        operationId: 1,
        masterId: 5,
        startDate: new Date("2016-02-02 09:00"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 2,
        masterId: 6,
        startDate: new Date("2016-03-03 09:17"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 3,
        masterId: 1,
        startDate: new Date("2016-02-15 09:36"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 4,
        masterId: 3,
        startDate: new Date("2015-12-03 15:30"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 5,
        masterId: 2,
        startDate: new Date("2016-01-27 11:55"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 6,
        masterId: 7,
        startDate: new Date("2016-02-29 11:25"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 7,
        masterId: 8,
        startDate: new Date("2016-01-23 9:50"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 8,
        masterId: 9,
        startDate: new Date("2016-01-17 13:30"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 3,
        masterId: 4,
        startDate: new Date("2016-01-17 13:45"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      },
      {
        operationId: 1,
        masterId: 10,
        startDate: new Date("2016-01-17 15:35"),
        expDate: new Date(this.startDate.getTime() + app.models.Operation.findById(this.operationId).duration)
      }
    ], (err, repairs) => {
      if (err) {
        throw err;
      }
      console.log('Models created: \n', repairs);
    });

  });
};
