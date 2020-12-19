import {Router} from 'express';
import {userService, fileService} from '../services';
import {authValidator} from "../validators";
import logger from "../loaders/logger";
import {StdIOAssignment, StdIOTestSpecification, StdIOTestResult} from "../models/stdio";
import mongoose from "mongoose";
import file from "../services/file";

let router = Router();

let multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});


router.get('/:assignment', async (req, res) => {
    res.render("submit")
    /*StdIOTestSpecification.create({
        testName: "baseTest",
        testTimeout: 500,
        testMemoryLeaks: true,
        testDiffTolerance: "none",
        testChecks: ["testInput", "testOutput", "testError", "testExitCode"],
        testExitCode: 0,
        testIsHidden: false,
        testArguments: [],
        testInput: "",
        testOutput: "",
        testError: "",
    })

    StdIOAssignment.create({
        assignmentName: "Lab 1",
        assignmentDueDate: {
            formalDueDate: Date,
            lateDueDate: Date
        },
        assignmentCompilationSpecifications: {
            compilationCommand: "make",
            compilationTimeout: 2000
        },
        assignmentRequiredFiles: ["main.cpp"],
        assignmentProvidedFiles: [],
        assignmentTests: [],
    });*/
});

router.post('/:assignment', upload.any(), async (req, res) => {
    const files = req.files;
    const fileIds = await Promise.all(files.map(file => {
        return fileService.createFile(file.originalname, req.session.userid, file.buffer)
    }));

    res.redirect("back")
});

export default router;
