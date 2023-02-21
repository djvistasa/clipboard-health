# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1

Update the database schema and TS interfaces, specifically the `Agent` document, to accept a new field which will store our customId. Let us call it agentId.

#### Acceptance criteria

The `Agent` document should now have an extra field of type integer (Assuming we are using mongo)
interface `IAgent`should now have an extra required field of type `number`.

#### Effort (Fibonacci )

3

### Ticket 2

Modify the `createAgent` method to create an Id that is sent to the database with each agent. You can use the `Date.now()` to create each unique Id.

#### Acceptance criteria

The `Agent` object that we send to the backend should have a new field called agentId of type integer. Field value should be `Date.now`.

#### Effort (Fibonacci )

5

### Ticket 3

Modify the `generateReport` method to expect agentId as a parameter so that customId may be used to generate a report

#### Acceptance criteria

The `generateReport` endpoint should be modified to take in a parameter called customId which will be used to generate a report for Agent found by customId.

The method should find Agent using customId and generate a report for said Agent.

#### Effort (Fibonacci )

8
