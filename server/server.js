import express from "express";
import cors from "cors";
import { ulid } from "ulid";
import { subDays, addHours, isWeekend } from "date-fns";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let users = [
  {
    id: ulid(),
    username: "juan_gomez",
    email: "juan.gomez@example.com",
    password: "password1",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "maria_lopez",
    email: "maria.lopez@example.com",
    password: "password2",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "carlos_perez",
    email: "carlos.perez@example.com",
    password: "password3",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "laura_garcia",
    email: "laura.garcia@example.com",
    password: "password4",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "antonio_fernandez",
    email: "antonio.fernandez@example.com",
    password: "password5",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "lucia_martinez",
    email: "lucia.martinez@example.com",
    password: "password6",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "javier_rodriguez",
    email: "javier.rodriguez@example.com",
    password: "password7",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "sara_sanchez",
    email: "sara.sanchez@example.com",
    password: "password8",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "david_ramos",
    email: "david.ramos@example.com",
    password: "password9",
    roles: ["EMPLOYEE"],
    created_at: new Date(),
  },
  {
    id: ulid(),
    username: "sofia_gutierrez",
    email: "sofia.gutierrez@example.com",
    password: "password10",
    roles: ["MANAGER"],
    created_at: new Date(),
  },
];

const generateTrackingData = (employeeId) => {
  const tracking = [];
  let currentDate = new Date();
  const startDate = subDays(currentDate, 60);

  while (currentDate > startDate) {
    if (!isWeekend(currentDate)) {
      const entryHour = Math.floor(Math.random() * (9 - 8 + 1) + 8);
      const entryTime = new Date(currentDate.setHours(entryHour, 0, 0, 0));
      const exitTime = addHours(entryTime, 8);

      tracking.push({
        id: ulid(),
        employeeId,
        date: new Date(currentDate),
        entryTime,
        exitTime,
      });
    }

    currentDate = subDays(currentDate, 1);
  }

  return tracking;
};

let tracking = users.flatMap((user) => generateTrackingData(user.id));

app.get("/api/tracking/:employeeId", (req, res) => {
  const employeeTracking = tracking
    .filter((t) => t.employeeId === req.params.employeeId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (employeeTracking.length === 0) {
    return res
      .status(404)
      .json({ message: "No tracking data found for this employee" });
  }

  res.json(employeeTracking);
});

app.get("/api/tracking/:employeeId/:date", (req, res) => {
  const { employeeId, date } = req.params;
  const trackingDate = new Date(date);
  const record = tracking.find(
    (t) =>
      t.employeeId === employeeId &&
      t.date.toDateString() === trackingDate.toDateString()
  );

  if (!record) {
    return res
      .status(404)
      .json({ message: "No tracking record found for this date" });
  }
  res.json(record);
});

app.post("/api/tracking", (req, res) => {
  const { employeeId, date, entryTime, exitTime } = req.body;

  if (!employeeId || !date || !entryTime || !exitTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newRecord = {
    id: ulid(),
    employeeId,
    date: new Date(date),
    entryTime: new Date(entryTime),
    exitTime: new Date(exitTime),
  };

  tracking.push(newRecord);
  res.status(201).json(newRecord);
});

app.put("/api/tracking/:id", (req, res) => {
  const { id } = req.params;
  const { date, entryTime, exitTime } = req.body;
  const record = tracking.find((t) => t.id === id);

  if (!record) {
    return res.status(404).json({ message: "Tracking record not found" });
  }

  record.date = date ? new Date(date) : record.date;
  record.entryTime = entryTime ? new Date(entryTime) : record.entryTime;
  record.exitTime = exitTime ? new Date(exitTime) : record.exitTime;

  res.json(record);
});

app.delete("/api/tracking/:id", (req, res) => {
  const { id } = req.params;
  const recordIndex = tracking.findIndex((t) => t.id === id);

  if (recordIndex === -1) {
    return res.status(404).json({ message: "Tracking record not found" });
  }

  tracking.splice(recordIndex, 1);
  res.status(204).send();
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const { username, email, password, roles } = req.body;

  if (!username || !email || !password || !roles) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newUser = {
    id: ulid(),
    username,
    email,
    password,
    roles,
    created_at: new Date(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { username, email, password, roles } = req.body;

  user.username = username || user.username;
  user.email = email || user.email;
  user.password = password || user.password;
  user.roles = roles || user.roles;

  res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

app.get("/api/audit", (req, res) => {
  const { startDate, endDate } = req.query;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const filteredTracking = tracking.filter((t) => {
    const trackingDate = new Date(t.date);
    return trackingDate >= start && trackingDate <= end;
  });

  if (filteredTracking.length === 0) {
    return res
      .status(404)
      .json({ message: "No tracking data found for the selected dates" });
  }

  res.json(filteredTracking);
});

app.get("/api/working", (req, res) => {
  const { dateTime } = req.query;

  if (!dateTime) {
    return res
      .status(400)
      .json({ message: "Please provide a valid date and time." });
  }

  const queryDateTime = new Date(dateTime);

  if (isNaN(queryDateTime.getTime())) {
    return res.status(400).json({ message: "Invalid date and time format." });
  }

  const workingUsers = tracking
    .filter((t) => {
      const entryTime = new Date(t.entryTime);
      const exitTime = new Date(t.exitTime);
      return queryDateTime >= entryTime && queryDateTime <= exitTime;
    })
    .map((t) => {
      const user = users.find((u) => u.id === t.employeeId);
      return user
        ? {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
          }
        : null;
    })
    .filter(Boolean); // Remover posibles null

  if (workingUsers.length === 0) {
    return res
      .status(404)
      .json({ message: "No users were working at the specified time." });
  }

  res.json(workingUsers);
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.password === password) {
    return res.json({ success: true, message: user.id });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
